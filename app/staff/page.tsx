"use client";

import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeading from "../components/staff/SectionHeading";
import StaffButton from "../components/staff/StaffButton";
import DataTable from "../components/staff/DataTable";
import EmptyState from "../components/staff/EmptyState";

/* ─── Types ─── */
interface Person {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  subteam: string;
  school: string;
  grade: string;
  company: string;
}

const PERSON_HEADERS = ["fullName", "email", "phone", "role", "subteam", "school", "grade", "company"] as const;

const SECTIONS = [
  { id: "people", label: "People & Access" },
  { id: "schedules", label: "Schedules" },
  { id: "rooms", label: "Room Assignments" },
  { id: "announcements", label: "Announcements" },
  { id: "qrcodes", label: "QR Codes" },
  { id: "resources", label: "Resource Library" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

/* ─── CSV helpers ─── */
function parseCSV(text: string): Person[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
    const person: Record<string, string> = {};
    headers.forEach((header, i) => {
      person[header] = values[i] || "";
    });
    return person as unknown as Person;
  });
}

function exportToCSV(people: Person[]) {
  const header = PERSON_HEADERS.join(",");
  const rows = people.map((p) => PERSON_HEADERS.map((h) => `"${p[h] || ""}"`).join(","));
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "people-export.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function StaffDashboardPage() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = parseCSV(text);
      setPeople((prev) => [...prev, ...parsed]);
      setUploadStatus(`Successfully uploaded ${parsed.length} people from ${file.name}`);
      setTimeout(() => setUploadStatus(null), 4000);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleSection = (id: string) => {
    setActiveSection((prev) => (prev === id ? null : id) as SectionId | null);
  };

  return (
    <div className="flex min-h-svh flex-col bg-white">
      <Navbar
        links={[
          { label: "Dashboard", href: "/staff", active: true },
          { label: "Sign Out", href: "/auth/login" },
        ]}
      />

      {/* ─── Blue hero ─── */}
      <div className="bg-[#1c6a90]">
        <div className="mx-auto max-w-[1000px] px-6 py-8">
          <h1 className="uppercase text-white" style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "0.35em" }}>
            Staff Dashboard
          </h1>
          <p className="mt-3 text-white/50" style={{ fontSize: "15px", fontWeight: 400, lineHeight: 1.7 }}>
            2026 International Conference Management Portal
          </p>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1000px] flex-1 px-6 py-14">
        <SectionHeading size="lg">Manage</SectionHeading>

        {/* Section toggles */}
        <div className="mt-8 grid gap-px border border-[#eaeaea] bg-[#eaeaea] sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => toggleSection(section.id)}
              className={`p-6 text-left transition-all duration-200 ${
                activeSection === section.id ? "bg-[#1c6a90]" : "bg-white hover:bg-[#1c6a90] group"
              }`}>
              <h3
                className={`uppercase transition-colors duration-200 ${
                  activeSection === section.id ? "text-white" : "text-[#222] group-hover:text-white"
                }`}
                style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.25em" }}>
                {section.label}
              </h3>
            </button>
          ))}
        </div>

        {/* ─── People & Access ─── */}
        {activeSection === "people" && (
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
        )}

        {/* ─── Placeholder sections ─── */}
        {activeSection === "schedules" && (
          <div className="mt-10">
            <SectionHeading>Schedules</SectionHeading>
            <EmptyState title="Coming soon." />
          </div>
        )}

        {activeSection === "rooms" && (
          <div className="mt-10">
            <SectionHeading>Room Assignments</SectionHeading>
            <EmptyState title="Coming soon." />
          </div>
        )}

        {activeSection === "announcements" && (
          <div className="mt-10">
            <SectionHeading>Announcements</SectionHeading>
            <EmptyState title="Coming soon." />
          </div>
        )}

        {activeSection === "qrcodes" && (
          <div className="mt-10">
            <SectionHeading>QR Codes</SectionHeading>
            <EmptyState title="Coming soon." />
          </div>
        )}

        {activeSection === "resources" && (
          <div className="mt-10">
            <SectionHeading>Resource Library</SectionHeading>
            <EmptyState title="Coming soon." />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
