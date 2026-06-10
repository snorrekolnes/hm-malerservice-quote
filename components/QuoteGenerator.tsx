"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { formatDateForDisplay, formatNok } from "@/lib/format";

type Unit = "rs" | "m2" | "stk" | "timer" | "lm";

type DocumentType =
  | "Pristilbud"
  | "Tilbud"
  | "Endringsmelding"
  | "FDV"
  | "Tilleggsarbeid"
  | "Faktura";

type QuoteRow = {
  id: string;
  description: string;
  unit: Unit;
  quantity: number;
  price: number;
};

type CertificateAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const units: Unit[] = ["rs", "m2", "stk", "timer", "lm"];

const documentTypes: DocumentType[] = [
  "Pristilbud",
  "Tilbud",
  "Endringsmelding",
  "FDV",
  "Tilleggsarbeid",
  "Faktura"
];

const logo = {
  src: "/brand/hm-malerservice-logo.png",
  alt: "H M malerservice",
  width: 654,
  height: 108
};

const certificates: CertificateAsset[] = [
  {
    src: "/brand/handverksgruppen.png",
    alt: "Håndverksgruppen",
    width: 600,
    height: 196
  },
  {
    src: "/brand/miljofyrtarn.png",
    alt: "Miljøfyrtårn",
    width: 332,
    height: 268
  },
  {
    src: "/brand/godkjent-laerebedrift.png",
    alt: "Godkjent lærebedrift",
    width: 826,
    height: 824
  },
  {
    src: "/brand/mester.png",
    alt: "Mester",
    width: 784,
    height: 672
  }
];

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

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-2 block text-xs font-semibold uppercase text-slate-500">
      {children}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase text-slate-500">{eyebrow}</p>
        <h2 className="mt-1 text-base font-semibold text-slate-950">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function BrandLogo() {
  const [hasLogo, setHasLogo] = useState(true);

  if (!hasLogo) {
    return (
      <div className="text-lg font-semibold text-slate-950">
        H &amp; M MALERSERVICE AS
      </div>
    );
  }

  return (
    <Image
      alt={logo.alt}
      className="h-auto w-[250px] object-contain"
      height={logo.height}
      onError={() => setHasLogo(false)}
      priority
      src={logo.src}
      width={logo.width}
    />
  );
}

function CertificateStrip() {
  const [hiddenAssets, setHiddenAssets] = useState<string[]>([]);
  const visibleCertificates = certificates.filter(
    (certificate) => !hiddenAssets.includes(certificate.src)
  );

  if (visibleCertificates.length === 0) {
    return null;
  }

  return (
    <div className="certificate-strip">
      {visibleCertificates.map((certificate) => (
        <Image
          alt={certificate.alt}
          className="certificate-image"
          height={certificate.height}
          key={certificate.src}
          onError={() => setHiddenAssets((current) => [...current, certificate.src])}
          src={certificate.src}
          width={certificate.width}
        />
      ))}
    </div>
  );
}

export function QuoteGenerator() {
  const [documentType, setDocumentType] = useState<DocumentType>("Pristilbud");
  const [project, setProject] = useState("");
  const [customer, setCustomer] = useState("");
  const [date, setDate] = useState(getTodayInputValue);
  const [riggDriftPercent, setRiggDriftPercent] = useState(0);
  const [rows, setRows] = useState<QuoteRow[]>([createRow()]);

  const totals = useMemo(() => {
    const subtotal = rows.reduce((sum, row) => sum + row.quantity * row.price, 0);
    const riggDrift = subtotal * (riggDriftPercent / 100);
    const subtotalWithRiggDrift = subtotal + riggDrift;
    const vat = subtotalWithRiggDrift * 0.25;

    return {
      subtotal,
      riggDrift,
      subtotalWithRiggDrift,
      vat,
      total: subtotalWithRiggDrift + vat
    };
  }, [riggDriftPercent, rows]);

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
    <main className="min-h-screen bg-[#f5f6f8] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1520px] gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <aside className="no-print h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase text-slate-500">Internt verktøy</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950">{documentType}</h1>
          </div>

          <div className="mt-5 space-y-5">
            <section>
              <SectionTitle eyebrow="Grunnlag" title="Dokument og kunde" />
              <div className="mt-4 space-y-4">
                <label className="block">
                  <FieldLabel>Dokumenttype</FieldLabel>
                  <select
                    className="form-control"
                    value={documentType}
                    onChange={(event) => setDocumentType(event.target.value as DocumentType)}
                  >
                    {documentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <FieldLabel>Prosjekt</FieldLabel>
                  <input
                    className="form-control"
                    value={project}
                    onChange={(event) => setProject(event.target.value)}
                    placeholder="Prosjektnavn"
                    type="text"
                  />
                </label>

                <label className="block">
                  <FieldLabel>Kunde</FieldLabel>
                  <input
                    className="form-control"
                    value={customer}
                    onChange={(event) => setCustomer(event.target.value)}
                    placeholder="Kundenavn"
                    type="text"
                  />
                </label>

                <label className="block">
                  <FieldLabel>Dato</FieldLabel>
                  <input
                    className="form-control"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    type="date"
                  />
                </label>

                <label className="block">
                  <FieldLabel>Rigg og drift %</FieldLabel>
                  <div className="range-field">
                    <input
                      aria-label="Rigg og drift prosent"
                      max="50"
                      min="0"
                      onChange={(event) => setRiggDriftPercent(Number(event.target.value))}
                      step="0.5"
                      type="range"
                      value={riggDriftPercent}
                    />
                    <input
                      className="form-control range-number"
                      max="50"
                      min="0"
                      onChange={(event) =>
                        setRiggDriftPercent(Math.min(50, Math.max(0, Number(event.target.value))))
                      }
                      step="0.5"
                      type="number"
                      value={riggDriftPercent}
                    />
                  </div>
                </label>
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-4">
              <SectionTitle eyebrow="Kontroll" title="Totalsummer" />
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Sum poster</span>
                  <span className="font-medium tabular-nums">{formatNok(totals.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Rigg og drift ({formatNok(riggDriftPercent)}%)</span>
                  <span className="font-medium tabular-nums">{formatNok(totals.riggDrift)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Sum eks mva</span>
                  <span className="font-medium tabular-nums">
                    {formatNok(totals.subtotalWithRiggDrift)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Mva (25%)</span>
                  <span className="font-medium tabular-nums">{formatNok(totals.vat)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                  <span className="font-semibold">Sum inkl mva</span>
                  <span className="text-lg font-semibold tabular-nums">{formatNok(totals.total)}</span>
                </div>
              </div>
            </section>
          </div>

          <button className="primary-button mt-5 w-full" onClick={generatePdf} type="button">
            Generer dokument
          </button>
        </aside>

        <section className="overflow-auto pb-10">
          <div className="print-area mx-auto w-fit rounded-[28px] bg-white p-3 shadow-2xl shadow-slate-200/80">
            <article className="a4-sheet">
              <header className="document-header">
                <div>
                  <BrandLogo />
                  <p className="mt-5 text-xs font-semibold uppercase text-slate-500">
                    {documentType}
                  </p>
                  <h2 className="mt-1 text-3xl font-semibold text-slate-950">
                    {project || "Prosjektnavn"}
                  </h2>
                </div>

                <div className="company-card">
                  <p className="font-semibold text-slate-950">H &amp; M Malerservice AS</p>
                  <p>Banevigsgt. 7, 4014 Stavanger</p>
                  <p>Tel: 51 89 09 60 / Fax: 51 89 62 60</p>
                  <p>www.hmmalerservice.no</p>
                </div>
              </header>

              <section className="document-section">
                <div className="section-heading">
                  <div>
                    <p className="section-eyebrow">Kundegrunnlag</p>
                    <h3>Dokument og kunde</h3>
                  </div>
                  <div className="date-pill">
                    <span>Dato</span>
                    <strong>{formatDateForDisplay(date)}</strong>
                  </div>
                </div>

                <div className="info-grid">
                  <label className="info-field">
                    <FieldLabel>Dokumenttype</FieldLabel>
                    <select
                      aria-label="Dokumenttype"
                      className="form-control document-input"
                      value={documentType}
                      onChange={(event) => setDocumentType(event.target.value as DocumentType)}
                    >
                      {documentTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <span className="print-value">{documentType}</span>
                  </label>

                  <label className="info-field">
                    <FieldLabel>Prosjekt</FieldLabel>
                    <input
                      aria-label="Prosjekt"
                      className="form-control document-input"
                      value={project}
                      onChange={(event) => setProject(event.target.value)}
                      placeholder="Prosjektnavn"
                      type="text"
                    />
                    <span className="print-value">{project}</span>
                  </label>

                  <label className="info-field">
                    <FieldLabel>Kunde</FieldLabel>
                    <input
                      aria-label="Kunde"
                      className="form-control document-input"
                      value={customer}
                      onChange={(event) => setCustomer(event.target.value)}
                      placeholder="Kundenavn"
                      type="text"
                    />
                    <span className="print-value">{customer}</span>
                  </label>

                  <label className="info-field">
                    <FieldLabel>Dato</FieldLabel>
                    <input
                      aria-label="Dato"
                      className="form-control document-input"
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                      type="date"
                    />
                    <span className="print-value">{formatDateForDisplay(date)}</span>
                  </label>
                </div>
              </section>

              <section className="document-section">
                <div className="section-heading">
                  <div>
                    <p className="section-eyebrow">Arbeidsomfang</p>
                    <h3>Poster</h3>
                  </div>
                  <button className="secondary-button no-print" onClick={addRow} type="button">
                    Legg til post
                  </button>
                </div>

                <div className="line-items-card">
                  <table className="quote-table">
                    <colgroup>
                      <col className="w-[52px]" />
                      <col />
                      <col className="w-[90px]" />
                      <col className="w-[96px]" />
                      <col className="w-[110px]" />
                      <col className="w-[120px]" />
                      <col className="no-print w-[72px]" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>Post</th>
                        <th>Beskrivelse</th>
                        <th>Enhet</th>
                        <th className="text-right">Masse</th>
                        <th className="text-right">Pris</th>
                        <th className="text-right">Sum</th>
                        <th className="no-print text-right">Handling</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => {
                        const lineTotal = row.quantity * row.price;

                        return (
                          <tr key={row.id}>
                            <td className="post-number">{index + 1}</td>
                            <td>
                              <textarea
                                aria-label={`Beskrivelse post ${index + 1}`}
                                className="table-control description-control"
                                onChange={(event) =>
                                  updateRow(row.id, { description: event.target.value })
                                }
                                placeholder="Beskrivelse av arbeid"
                                rows={3}
                                value={row.description}
                              />
                              <span className="print-value">{row.description}</span>
                            </td>
                            <td>
                              <select
                                aria-label={`Enhet post ${index + 1}`}
                                className="table-control"
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
                                className="table-control text-right"
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
                                className="table-control text-right"
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
                            <td className="line-total">{formatNok(lineTotal)}</td>
                            <td className="no-print text-right">
                              <button
                                className="delete-button"
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
                </div>
              </section>

              <section className="summary-section">
                <div className="note-card">
                  <p>Det ble gitt en forlengelse av driften på 0 dager på grunn av endringer.</p>
                  <p>Prisen inkluderer materialer og arbeid.</p>
                </div>

                <div className="totals-card">
                  <div>
                    <span>Sum poster</span>
                    <strong>{formatNok(totals.subtotal)}</strong>
                  </div>
                  <div>
                    <span>Rigg og drift ({formatNok(riggDriftPercent)}%)</span>
                    <strong>{formatNok(totals.riggDrift)}</strong>
                  </div>
                  <div>
                    <span>Sum eks mva</span>
                    <strong>{formatNok(totals.subtotalWithRiggDrift)}</strong>
                  </div>
                  <div>
                    <span>Mva (25%)</span>
                    <strong>{formatNok(totals.vat)}</strong>
                  </div>
                  <div className="grand-total">
                    <span>Sum inkl mva</span>
                    <strong>{formatNok(totals.total)}</strong>
                  </div>
                </div>
              </section>

              <footer className="document-footer">
                <div>
                  <p>Vennlig hilsen</p>
                  <p className="mt-8 font-semibold text-slate-950">H &amp; M Malerservice AS</p>
                </div>
                <CertificateStrip />
              </footer>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
