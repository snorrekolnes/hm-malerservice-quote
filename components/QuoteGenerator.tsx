"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { formatDateForDisplay, formatNok } from "@/lib/format";

type Unit = "rs" | "stk" | "lm" | "m²" | "m³" | "timer" | "dag";

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
  quantity: string;
  price: string;
};

type CertificateAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const units: Unit[] = ["rs", "stk", "lm", "m²", "m³", "timer", "dag"];

const documentTypes: DocumentType[] = [
  "Pristilbud",
  "Tilbud",
  "Endringsmelding",
  "FDV",
  "Tilleggsarbeid",
  "Faktura"
];

const documentPrefixes: Record<DocumentType, string> = {
  Pristilbud: "T",
  Tilbud: "T",
  Endringsmelding: "EM",
  FDV: "FDV",
  Tilleggsarbeid: "TA",
  Faktura: "F"
};

const descriptionTitles: Record<DocumentType, string> = {
  Pristilbud: "Beskrivelse av pristilbud",
  Tilbud: "Beskrivelse av tilbud",
  Endringsmelding: "Beskrivelse av endringsmelding",
  FDV: "Beskrivelse",
  Tilleggsarbeid: "Beskrivelse av tilleggsarbeid",
  Faktura: "Beskrivelse"
};

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

function getDefaultDocumentNumber(type: DocumentType) {
  return `${documentPrefixes[type]}-${new Date().getFullYear()}-001`;
}

function createRow(): QuoteRow {
  return {
    id: crypto.randomUUID(),
    description: "",
    unit: "rs",
    quantity: "1",
    price: "0"
  };
}

function parseNorwegianNumber(value: string) {
  const normalized = value.replace(/\s/g, "").replace(",", ".");
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}

function isValidDecimalInput(value: string) {
  return /^\d*(?:[,.]\d*)?$/.test(value);
}

function capitalizeSentences(value: string) {
  return value.replace(
    /(^\s*|[.!?]\s*|\n\s*)([a-z\u00e6\u00f8\u00e5])/g,
    (_, prefix: string, letter: string) => `${prefix}${letter.toLocaleUpperCase("nb-NO")}`
  );
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
      className="h-auto w-[312px] object-contain"
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
  const [documentNumber, setDocumentNumber] = useState(() =>
    getDefaultDocumentNumber("Pristilbud")
  );
  const [project, setProject] = useState("");
  const [customer, setCustomer] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(getTodayInputValue);
  const [riggDriftPercent, setRiggDriftPercent] = useState(0);
  const [additionalDescription, setAdditionalDescription] = useState("");
  const [showDetailedDescription, setShowDetailedDescription] = useState(false);
  const [rows, setRows] = useState<QuoteRow[]>([createRow()]);

  const totals = useMemo(() => {
    const subtotal = rows.reduce(
      (sum, row) =>
        sum + parseNorwegianNumber(row.quantity) * parseNorwegianNumber(row.price),
      0
    );
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

  const projectInformation = [
    { label: "Prosjekt", value: project },
    { label: "Kunde", value: customer },
    { label: "Kontaktperson", value: contactPerson },
    { label: "Telefon", value: phone },
    { label: "E-post", value: email },
    { label: "Adresse", value: address }
  ].filter((field) => field.value.trim().length > 0);

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

  function changeDocumentType(type: DocumentType) {
    setDocumentType(type);
    setDocumentNumber(getDefaultDocumentNumber(type));
    setShowDetailedDescription(type !== "Faktura");
  }

  function generatePdf() {
    window.print();
  }
  function saveDocument() {
  const documentData = {
    documentType,
    documentNumber,
    project,
    customer,
    contactPerson,
    phone,
    address,
    email,
    date,
    riggDriftPercent,
    additionalDescription,
    showDetailedDescription,
    rows
  };

  const blob = new Blob(
    [JSON.stringify(documentData, null, 2)],
    { type: "application/json" }
  );

  const fileName = `${documentNumber || "dokument"}.hmdoc`;

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function loadDocument(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string);

      setDocumentType(data.documentType);
      setDocumentNumber(data.documentNumber);
      setProject(data.project);
      setCustomer(data.customer);
      setContactPerson(data.contactPerson);
      setPhone(data.phone);
      setAddress(data.address);
      setEmail(data.email);
      setDate(data.date);
      setRiggDriftPercent(data.riggDriftPercent);
      setAdditionalDescription(data.additionalDescription);
      setShowDetailedDescription(data.showDetailedDescription);
      setRows(data.rows);

    } catch {
      alert("Kunne ikke åpne dokumentet.");
    }
  };

  reader.readAsText(file);
}

  return (
    <main className="min-h-screen bg-[#f5f6f8] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1520px] gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="no-print h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase text-slate-500">Internt verktøy</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950">{documentType}</h1>
          </div>

          <div className="mt-5 space-y-5">
            <section>
              <SectionTitle eyebrow="Kunde" title="Prosjekt" />
              <div className="mt-4 space-y-4">
                <label className="block">
                  <FieldLabel>Dokumenttype</FieldLabel>
                  <select
                    className="form-control"
                    value={documentType}
                    onChange={(event) => changeDocumentType(event.target.value as DocumentType)}
                  >
                    {documentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <FieldLabel>Dokumentnummer</FieldLabel>
                  <input
                    className="form-control"
                    onChange={(event) => setDocumentNumber(event.target.value.toUpperCase())}
                    placeholder="T-2026-001"
                    type="text"
                    value={documentNumber}
                  />
                </label>

                <label className="block">
                  <FieldLabel>Prosjekt</FieldLabel>
                  <input
                    className="form-control"
                    value={project}
                    onChange={(event) => setProject(capitalizeSentences(event.target.value))}
                    placeholder="Prosjektnavn"
                    type="text"
                  />
                </label>

                <label className="block">
                  <FieldLabel>Kunde</FieldLabel>
                  <input
                    className="form-control"
                    value={customer}
                    onChange={(event) => setCustomer(capitalizeSentences(event.target.value))}
                    placeholder="Kundenavn"
                    type="text"
                  />
                </label>

                <label className="block">
                  <FieldLabel>Kontaktperson</FieldLabel>
                  <input
                    className="form-control"
                    onChange={(event) =>
                      setContactPerson(capitalizeSentences(event.target.value))
                    }
                    placeholder="Kontaktperson"
                    type="text"
                    value={contactPerson}
                  />
                </label>

                <label className="block">
                  <FieldLabel>Telefon</FieldLabel>
                  <input
                    className="form-control"
                    inputMode="tel"
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Telefonnummer"
                    type="tel"
                    value={phone}
                  />
                </label>

                <label className="block">
                  <FieldLabel>E-post</FieldLabel>
                  <input
                    className="form-control"
                    inputMode="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="navn@eksempel.no"
                    type="email"
                    value={email}
                  />
                </label>

                <label className="block">
                  <FieldLabel>Adresse</FieldLabel>
                  <textarea
                    className="form-control"
                    onChange={(event) => setAddress(capitalizeSentences(event.target.value))}
                    placeholder={"Adresse\nPostnummer og sted"}
                    rows={3}
                    value={address}
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

                <label className="checkbox-field">
                  <input
                    checked={showDetailedDescription}
                    onChange={(event) => setShowDetailedDescription(event.target.checked)}
                    type="checkbox"
                  />
                  <span>Inkluder beskrivelse</span>
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

          <div className="mt-5 space-y-3">

  <button
    className="secondary-button w-full"
    onClick={saveDocument}
    type="button"
  >
    💾 Lagre dokument
  </button>

  <label className="secondary-button w-full flex justify-center cursor-pointer">
    📂 Åpne dokument
    <input
      hidden
      accept=".hmdoc"
      type="file"
      onChange={loadDocument}
    />
  </label>

  <button
    className="primary-button w-full"
    onClick={generatePdf}
    type="button"
  >
    Generer dokument
  </button>

</div>
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

                <div>
                  <div className="document-meta">
                    <p>
                      <span>Dokumentnr:</span> {documentNumber || "-"}
                    </p>
                    <p>
                      <span>Dato:</span> {formatDateForDisplay(date)}
                    </p>
                  </div>
                  <div className="company-card">
                    <p className="font-semibold text-slate-950">H &amp; M Malerservice AS</p>
                    <p>Banevigsgt. 7, 4014 Stavanger</p>
                    <p>Tel: 51 89 09 60 / Fax: 51 89 62 60</p>
                    <p>www.hmmalerservice.no</p>
                  </div>
                </div>
              </header>

              {projectInformation.length > 0 && (
                <section className="document-section">
                  <div className="section-heading">
                    <div>
                      <h3>Prosjektinformasjon</h3>
                    </div>
                  </div>

                  <dl className="project-info-list">
                    {projectInformation.map((field) => (
                      <div key={field.label}>
                        <dt>{field.label}</dt>
                        <dd>{field.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

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
                      <col className="w-[100px]" />
                      <col className="w-[120px]" />
                      <col className="w-[120px]" />
                      <col className="w-[102px]" />
                      <col className="no-print w-[62px]" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>Post</th>
                        <th>Beskrivelse</th>
                        <th>Enhet</th>
                        <th className="text-right">Mengde</th>
                        <th className="text-right">Pris</th>
                        <th className="text-right">Sum</th>
                        <th className="no-print text-right">Handling</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => {
                        const quantity = parseNorwegianNumber(row.quantity);
                        const price = parseNorwegianNumber(row.price);
                        const lineTotal = quantity * price;

                        return (
                          <tr key={row.id}>
                            <td className="post-number">{index + 1}</td>
                            <td>
                              <input
                                aria-label={`Beskrivelse post ${index + 1}`}
                                className="table-control"
                                onChange={(event) =>
                                  updateRow(row.id, {
                                    description: capitalizeSentences(event.target.value)
                                  })
                                }
                                placeholder="Beskrivelse av arbeid"
                                type="text"
                                value={row.description}
                              />
                              <span className="print-value line-description">
                                {row.description}
                              </span>
                            </td>
                            <td>
                              <select
                                aria-label={`Enhet post ${index + 1}`}
                                className="table-control unit-control"
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
                                aria-label={`Mengde post ${index + 1}`}
                                className="table-control numeric-control text-right"
                                inputMode="decimal"
                                value={row.quantity}
                                onChange={(event) => {
                                  if (isValidDecimalInput(event.target.value)) {
                                    updateRow(row.id, { quantity: event.target.value });
                                  }
                                }}
                                type="text"
                              />
                              <span className="print-value text-right">{formatNok(quantity)}</span>
                            </td>
                            <td className="text-right">
                              <input
                                aria-label={`Pris post ${index + 1}`}
                                className="table-control numeric-control text-right"
                                inputMode="decimal"
                                value={row.price}
                                onChange={(event) => {
                                  if (isValidDecimalInput(event.target.value)) {
                                    updateRow(row.id, { price: event.target.value });
                                  }
                                }}
                                type="text"
                              />
                              <span className="print-value text-right">{formatNok(price)}</span>
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

              {showDetailedDescription && additionalDescription.trim().length > 0  && (
                <section className="document-section offer-description-section">
                  <div className="section-heading">
                    <div>
                      <h3>{descriptionTitles[documentType]}</h3>
                    </div>
                  </div>
                  <textarea
                    aria-label="Detaljert beskrivelse"
                    className="form-control additional-description-control"
                    onChange={(event) =>
                      setAdditionalDescription(capitalizeSentences(event.target.value))
                    }
                    onInput={(event) => {
                      event.currentTarget.style.height = "auto";
                      event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
                    }}
                    placeholder="Skriv en detaljert beskrivelse av tilbudet, endringen eller arbeidsomfanget"
                    rows={3}
                    value={additionalDescription}
                  />
                  <div className="print-value additional-description-print">
                    {additionalDescription}
                  </div>
                </section>
              )}

              <div className="document-closing">
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
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
