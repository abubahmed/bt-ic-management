"use client";

import { useState, useRef } from "react";
import Papa from "papaparse";
import SectionHeading from "./SectionHeading";
import StaffButton from "./StaffButton";
import DataTable from "./DataTable";
import EmptyState from "./EmptyState";

interface Person {
  name: string;
  email: string;
  phone: string;
  team: string;
  organization: string;
  grade: string;
}

const PERSON_HEADERS = ["name", "email", "phone", "team", "organization", "grade"] as const;

function parseCSV(text: string): Person[] {
  const result = Papa.parse<Person>(text, { header: true, skipEmptyLines: true });
  return result.data;
}

function exportToCSV(people: Person[]) {
  const csv = Papa.unparse(people, { columns: [...PERSON_HEADERS] });
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "people-export.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function PeopleSection() {
  const [people, setPeople] = useState<Person[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [pendingUpload, setPendingUpload] = useState<Person[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = parseCSV(text);
      setPendingUpload(parsed);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const confirmUpload = () => {
    if (!pendingUpload) return;
    setPeople((prev) => [...prev, ...pendingUpload]);
    setUploadStatus(`Successfully uploaded ${pendingUpload.length} people`);
    setTimeout(() => setUploadStatus(null), 4000);
    setPendingUpload(null);
  };

  return (
    <>
      <div className="mt-10">
        <SectionHeading>People & Access</SectionHeading>

        <div className="mt-8 flex items-center gap-4">
          <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          <StaffButton onClick={() => fileInputRef.current?.click()}>Upload CSV</StaffButton>
          <StaffButton variant="secondary" onClick={() => exportToCSV(people)} disabled={people.length === 0}>
            Export CSV
          </StaffButton>
          <p className="text-[#999]" style={{ fontSize: "13px" }}>
            {people.length} {people.length === 1 ? "person" : "people"} loaded
          </p>
        </div>

        {uploadStatus && (
          <p className="mt-4 text-[#1c6a90]" style={{ fontSize: "13px", fontWeight: 500 }}>
            {uploadStatus}
          </p>
        )}

        {people.length > 0 ? (
          <DataTable
            headers={PERSON_HEADERS}
            rows={people}
            onRemove={(i) => setPeople((prev) => prev.filter((_, idx) => idx !== i))}
          />
        ) : (
          <EmptyState title="No people uploaded yet." subtitle="Upload a CSV file." />
        )}
      </div>

      {/* Upload preview modal */}
      {pendingUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 flex max-h-[80vh] w-full max-w-[800px] flex-col bg-white">
            <div className="flex items-center justify-between border-b border-[#eaeaea] px-8 py-5">
              <h2
                className="uppercase text-[#222]"
                style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.2em" }}>
                Review Upload
              </h2>
              <p className="text-[#999]" style={{ fontSize: "13px" }}>
                {pendingUpload.length} {pendingUpload.length === 1 ? "person" : "people"} found
              </p>
            </div>

            <div className="flex-1 overflow-auto px-8 py-4">
              <DataTable headers={PERSON_HEADERS} rows={pendingUpload} />
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-[#eaeaea] px-8 py-5">
              <StaffButton variant="secondary" onClick={() => setPendingUpload(null)}>
                Cancel
              </StaffButton>
              <StaffButton onClick={confirmUpload}>Confirm Upload</StaffButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
