"use client";

import { useMemo, useState } from "react";
import { formatDateForDisplay, formatNok } from "@/lib/format";

type Unit = "rs" | "m2" | "stk" | "timer";

type QuoteRow = {
  id: string;
  description: string;
  unit: Unit;
  quantity: number;
  price: number;
};

const units: Unit[] = ["rs", "m2", "stk", "timer"];

function getTodayInputValue() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function createRow(): QuoteRow {
  return {
    id: crypto.randomUUID(),
    description: "",
    unit: "rs",
    quantity: 1,
    price: 0
  };
}

export function QuoteGenerator() {
  const [project, setProject] = useState("");
  const [customer, setCustomer] = useState("");
  const [date, setDate] = useState(getTodayInputValue);
  const [rows, setRows] = useState<QuoteRow[]>([createRow()]);

  const totals = useMemo(() => {
    const subtotal = rows.reduce((sum, row) => sum + row.quantity * row.price, 0);
    const vat = subtotal * 0.25;

    return {
      subtotal,
      vat,
      total: subtotal + vat
    };
  }, [rows]);

  function updateRow(id: string, changes: Partial<QuoteRow>) {
    setRows((currentRows) =>
      currentRows.map((row) => (row.id === id ? { ...row, ...changes } : row))
    );
  }

  function removeRow(id: string) {
    setRows((currentRows) =>
      currentRows.length === 1 ? currentRows : currentRows.filter((row) => row.id !== id)
    );
  }

  function addRow() {
    setRows((currentRows) => [...currentRows, createRow()]);
  }

  function generatePdf() {
    window.print();
  }

  return (
    <main className="min-h-screen px-5 py-6 text-neutral-900">
      <div className="mx-auto grid max-w-[1480px] gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="no-print h-fit border border-gray-300 bg-white p-4 shadow-sm">
          <div className="border-b border-gray-200 pb-4">
            <p className="text-xs font-bold uppercase text-gray-500">
              Internt verktøy
            </p>
            <h1 className="mt-1 text-xl font-bold">Pristilbud</h1>
            <p className="mt-2 text-sm leading-5 text-gray-600">
              Fyll inn prosjekt, kunde og poster. Bruk knappen for å skrive ut eller lagre som PDF.
            </p>
          </div>

          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Prosjekt</span>
              <input
                className="screen-input"
                value={project}
                onChange={(event) => setProject(event.target.value)}
                placeholder="Prosjektnavn"
                type="text"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Kunde</span>
              <input
                className="screen-input"
                value={customer}
                onChange={(event) => setCustomer(event.target.value)}
                placeholder="Kundenavn"
                type="text"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Dato</span>
              <input
                className="screen-input"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                type="date"
              />
            </label>
          </div>

          <button
            className="mt-5 w-full rounded bg-neutral-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-neutral-700"
            onClick={generatePdf}
            type="button"
          >
            Generer PDF
          </button>
        </aside>

        <section className="overflow-auto pb-8">
          <div className="print-area mx-auto w-fit shadow-sheet">
            <article className="a4-sheet">
              <header className="border-b-2 border-neutral-900 pb-5">
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <p className="text-2xl font-bold">H &amp; M MALERSERVICE AS</p>
                    <p className="mt-1 text-lg font-bold">PRISTILBUD</p>
                  </div>

                  <div className="text-right text-xs leading-5">
                    <p className="font-bold">H &amp; M Malerservice AS</p>
                    <p>Banevigsgt. 7, 4014 Stavanger</p>
                    <p>Tel: 51 89 09 60 / Fax: 51 89 62 60</p>
                    <p>www.hmmalerservice.no</p>
                  </div>
                </div>
              </header>

              <section className="mt-7 grid grid-cols-[120px_1fr_90px_130px] gap-x-3 gap-y-3 text-sm">
                <p className="font-bold">Prosjekt:</p>
                <div className="border-b border-gray-400 pb-1">
                  <input
                    aria-label="Prosjekt"
                    className="screen-input !border-0 !p-0 !shadow-none"
                    value={project}
                    onChange={(event) => setProject(event.target.value)}
                    placeholder="Prosjektnavn"
                    type="text"
                  />
                  <span className="print-value">{project}</span>
                </div>

                <p className="font-bold">Dato:</p>
                <div className="border-b border-gray-400 pb-1">
                  <input
                    aria-label="Dato"
                    className="screen-input !border-0 !p-0 !shadow-none"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    type="date"
                  />
                  <span className="print-value">{formatDateForDisplay(date)}</span>
                </div>

                <p className="font-bold">Kunde:</p>
                <div className="col-span-3 border-b border-gray-400 pb-1">
                  <input
                    aria-label="Kunde"
                    className="screen-input !border-0 !p-0 !shadow-none"
                    value={customer}
                    onChange={(event) => setCustomer(event.target.value)}
                    placeholder="Kundenavn"
                    type="text"
                  />
                  <span className="print-value">{customer}</span>
                </div>
              </section>

              <section className="mt-8">
                <table className="quote-table">
                  <colgroup>
                    <col className="w-[46px]" />
                    <col />
                    <col className="w-[78px]" />
                    <col className="w-[86px]" />
                    <col className="w-[95px]" />
                    <col className="w-[105px]" />
                    <col className="no-print w-[54px]" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>Post</th>
                      <th>Beskrivelse</th>
                      <th>Enhet</th>
                      <th className="text-right">Masse</th>
                      <th className="text-right">Pris</th>
                      <th className="text-right">Sum</th>
                      <th className="no-print text-center">Slett</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => {
                      const lineTotal = row.quantity * row.price;

                      return (
                        <tr key={row.id}>
                          <td className="text-center font-semibold">{index + 1}</td>
                          <td>
                            <input
                              aria-label={`Beskrivelse post ${index + 1}`}
                              className="screen-input !border-0 !p-0 !shadow-none"
                              value={row.description}
                              onChange={(event) =>
                                updateRow(row.id, { description: event.target.value })
                              }
                              placeholder="Beskrivelse av arbeid"
                              type="text"
                            />
                            <span className="print-value">{row.description}</span>
                          </td>
                          <td>
                            <select
                              aria-label={`Enhet post ${index + 1}`}
                              className="screen-input !border-0 !p-0 !shadow-none"
                              value={row.unit}
                              onChange={(event) =>
                                updateRow(row.id, { unit: event.target.value as Unit })
                              }
                            >
                              {units.map((unit) => (
                                <option key={unit} value={unit}>
                                  {unit}
                                </option>
                              ))}
                            </select>
                            <span className="print-value">{row.unit}</span>
                          </td>
                          <td className="text-right">
                            <input
                              aria-label={`Masse post ${index + 1}`}
                              className="screen-input !border-0 !p-0 !text-right !shadow-none"
                              min="0"
                              step="0.01"
                              value={row.quantity}
                              onChange={(event) =>
                                updateRow(row.id, {
                                  quantity: Number(event.target.value)
                                })
                              }
                              type="number"
                            />
                            <span className="print-value text-right">{formatNok(row.quantity)}</span>
                          </td>
                          <td className="text-right">
                            <input
                              aria-label={`Pris post ${index + 1}`}
                              className="screen-input !border-0 !p-0 !text-right !shadow-none"
                              min="0"
                              step="0.01"
                              value={row.price}
                              onChange={(event) =>
                                updateRow(row.id, {
                                  price: Number(event.target.value)
                                })
                              }
                              type="number"
                            />
                            <span className="print-value text-right">{formatNok(row.price)}</span>
                          </td>
                          <td className="text-right font-semibold">{formatNok(lineTotal)}</td>
                          <td className="no-print text-center">
                            <button
                              className="rounded border border-gray-300 px-2 py-1 text-xs font-bold hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                              disabled={rows.length === 1}
                              onClick={() => removeRow(row.id)}
                              type="button"
                            >
                              Slett
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="no-print mt-3">
                  <button
                    className="rounded border border-gray-400 bg-white px-3 py-2 text-sm font-bold hover:bg-gray-100"
                    onClick={addRow}
                    type="button"
                  >
                    Legg til post
                  </button>
                </div>
              </section>

              <section className="ml-auto mt-6 w-[270px] text-sm">
                <div className="grid grid-cols-[1fr_120px] border border-gray-400">
                  <p className="border-b border-gray-300 bg-gray-100 px-3 py-2 font-bold">
                    Sum eks mva
                  </p>
                  <p className="border-b border-gray-300 px-3 py-2 text-right">
                    {formatNok(totals.subtotal)}
                  </p>
                  <p className="border-b border-gray-300 bg-gray-100 px-3 py-2 font-bold">
                    Mva (25%)
                  </p>
                  <p className="border-b border-gray-300 px-3 py-2 text-right">
                    {formatNok(totals.vat)}
                  </p>
                  <p className="bg-gray-200 px-3 py-2 font-bold">Sum inkl mva</p>
                  <p className="bg-gray-200 px-3 py-2 text-right font-bold">
                    {formatNok(totals.total)}
                  </p>
                </div>
              </section>

              <footer className="mt-12 text-sm leading-7">
                <p>Det ble gitt en forlengelse av driften på 0 dager på grunn av endringer.</p>
                <p>Prisen inkluderer materialer og arbeid.</p>
                <p className="mt-8">Vennlig hilsen</p>
                <p className="mt-10 font-bold">H &amp; M Malerservice AS</p>
              </footer>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
