"use client";

import Link from "next/link";
import { useState, useRef } from "react";

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

const STATS = [
  { label: "Attendees", value: "268" },
  { label: "Staff", value: "24" },
  { label: "Events Today", value: "3" },
];

const SECTIONS = [
  { id: "people", label: "People & Access" },
  { id: "schedules", label: "Schedules" },
  { id: "rooms", label: "Room Assignments" },
  { id: "announcements", label: "Announcements" },
  { id: "qrcodes", label: "QR Codes" },
  { id: "resources", label: "Resource Library" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

/* ─── CSV parsing helper ─── */
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

/* ─── Export helper ─── */
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

  const toggleSection = (id: SectionId) => {
    setActiveSection((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-svh bg-white">
      {/* ─── Blue hero section ─── */}
      <div className="bg-[#1c6a90]">
        <div className="mx-auto max-w-[1000px] px-6 pb-16 pt-10">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <p className="uppercase text-white/50" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.4em" }}>
              November 8–10, 2026 &middot; New York City
            </p>
            <Link
              href="/auth/login"
              className="uppercase text-white/60 transition-colors hover:text-white"
              style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em" }}>
              Sign Out
            </Link>
          </div>

          {/* Title */}
          <div className="mt-10">
            <h1
              className="uppercase text-white"
              style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "0.35em" }}>
              Staff Dashboard
            </h1>
            <p className="mt-3 text-white/50" style={{ fontSize: "15px", fontWeight: 400, lineHeight: 1.7 }}>
              2026 International Conference Management Portal
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-px">
            {STATS.map((stat) => (
              <div key={stat.label} className="border-l border-white/15 px-5 py-1 first:border-l-0">
                <p className="text-white" style={{ fontSize: "36px", fontWeight: 700 }}>
                  {stat.value}
                </p>
                <p
                  className="mt-1 uppercase text-white/40"
                  style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.3em" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Manage section with inline panels ─── */}
      <main className="mx-auto max-w-[1000px] px-6 py-14">
        <h2
          className="uppercase text-[#222]"
          style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "0.3em" }}>
          Manage
        </h2>
        <div className="mt-1 h-px w-10 bg-[#1c6a90]" />

        {/* Section toggles */}
        <div className="mt-8 grid gap-px border border-[#eaeaea] bg-[#eaeaea] sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => toggleSection(section.id)}
              className={`p-6 text-left transition-all duration-200 ${
                activeSection === section.id
                  ? "bg-[#1c6a90]"
                  : "bg-white hover:bg-[#1c6a90] group"
              }`}>
              <h3
                className={`uppercase transition-colors duration-200 ${
                  activeSection === section.id
                    ? "text-white"
                    : "text-[#222] group-hover:text-white"
                }`}
                style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.25em" }}>
                {section.label}
              </h3>
            </button>
          ))}
        </div>

        {/* ─── People & Access panel ─── */}
        {activeSection === "people" && (
          <div className="mt-10">
            <h3
              className="uppercase text-[#1c6a90]"
              style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.3em" }}>
              People & Access
            </h3>
            <div className="mt-1 h-px w-8 bg-[#1c6a90]" />

            {/* Upload + Export row */}
            <div className="mt-8 flex items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="border border-[#1c6a90] bg-[#1c6a90] uppercase text-white transition-all duration-300 hover:bg-white hover:text-[#1c6a90]"
                style={{ height: "44px", padding: "0 24px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.25em" }}>
                Upload CSV
              </button>
              <button
                onClick={() => exportToCSV(people)}
                disabled={people.length === 0}
                className="border border-[#222] uppercase text-[#222] transition-all duration-300 hover:bg-[#222] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                style={{ height: "44px", padding: "0 24px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.25em" }}>
                Export CSV
              </button>
              <p className="text-[#999]" style={{ fontSize: "13px" }}>
                {people.length} {people.length === 1 ? "person" : "people"} loaded
              </p>
            </div>

            {uploadStatus && (
              <p className="mt-4 text-[#1c6a90]" style={{ fontSize: "13px", fontWeight: 500 }}>
                {uploadStatus}
              </p>
            )}

            {/* People table */}
            {people.length > 0 && (
              <div className="mt-8 overflow-x-auto border border-[#eaeaea]">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-[#eaeaea] bg-[#f8f8f8]">
                      {PERSON_HEADERS.map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3 text-left uppercase text-[#999]"
                          style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em" }}>
                          {header.replace(/([A-Z])/g, " $1").trim()}
                        </th>
                      ))}
                      <th
                        className="px-4 py-3 text-left uppercase text-[#999]"
                        style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {people.map((person, i) => (
                      <tr key={i} className="border-b border-[#eaeaea] last:border-b-0 transition-colors hover:bg-[#fafafa]">
                        {PERSON_HEADERS.map((header) => (
                          <td
                            key={header}
                            className="px-4 py-3 text-[#333]"
                            style={{ fontSize: "13px" }}>
                            {person[header] || "—"}
                          </td>
                        ))}
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setPeople((prev) => prev.filter((_, idx) => idx !== i))}
                            className="text-[#c0392b] transition-colors hover:text-[#e74c3c]"
                            style={{ fontSize: "12px", fontWeight: 600 }}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {people.length === 0 && (
              <div className="mt-8 flex items-center justify-center border border-dashed border-[#ddd] bg-[#fafafa] py-16">
                <div className="text-center">
                  <p className="text-[#aaa]" style={{ fontSize: "14px" }}>
                    No people uploaded yet.
                  </p>
                  <p className="mt-2 text-[#ccc]" style={{ fontSize: "12px" }}>
                    Upload a CSV file.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── Placeholder panels for other sections ─── */}
        {activeSection === "schedules" && (
          <div className="mt-10">
            <h3 className="uppercase text-[#1c6a90]" style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.3em" }}>
              Schedules
            </h3>
            <div className="mt-1 h-px w-8 bg-[#1c6a90]" />
            <div className="mt-8 flex items-center justify-center border border-dashed border-[#ddd] bg-[#fafafa] py-16">
              <p className="text-[#aaa]" style={{ fontSize: "14px" }}>Coming soon.</p>
            </div>
          </div>
        )}

        {activeSection === "rooms" && (
          <div className="mt-10">
            <h3 className="uppercase text-[#1c6a90]" style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.3em" }}>
              Room Assignments
            </h3>
            <div className="mt-1 h-px w-8 bg-[#1c6a90]" />
            <div className="mt-8 flex items-center justify-center border border-dashed border-[#ddd] bg-[#fafafa] py-16">
              <p className="text-[#aaa]" style={{ fontSize: "14px" }}>Coming soon.</p>
            </div>
          </div>
        )}

        {activeSection === "announcements" && (
          <div className="mt-10">
            <h3 className="uppercase text-[#1c6a90]" style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.3em" }}>
              Announcements
            </h3>
            <div className="mt-1 h-px w-8 bg-[#1c6a90]" />
            <div className="mt-8 flex items-center justify-center border border-dashed border-[#ddd] bg-[#fafafa] py-16">
              <p className="text-[#aaa]" style={{ fontSize: "14px" }}>Coming soon.</p>
            </div>
          </div>
        )}

        {activeSection === "qrcodes" && (
          <div className="mt-10">
            <h3 className="uppercase text-[#1c6a90]" style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.3em" }}>
              QR Codes
            </h3>
            <div className="mt-1 h-px w-8 bg-[#1c6a90]" />
            <div className="mt-8 flex items-center justify-center border border-dashed border-[#ddd] bg-[#fafafa] py-16">
              <p className="text-[#aaa]" style={{ fontSize: "14px" }}>Coming soon.</p>
            </div>
          </div>
        )}

        {activeSection === "resources" && (
          <div className="mt-10">
            <h3 className="uppercase text-[#1c6a90]" style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.3em" }}>
              Resource Library
            </h3>
            <div className="mt-1 h-px w-8 bg-[#1c6a90]" />
            <div className="mt-8 flex items-center justify-center border border-dashed border-[#ddd] bg-[#fafafa] py-16">
              <p className="text-[#aaa]" style={{ fontSize: "14px" }}>Coming soon.</p>
            </div>
          </div>
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-[#1c6a90] px-6 py-10">
        <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-5">
          <div className="flex items-center gap-5">
            {/* Instagram */}
            <a href="#" className="text-white/40 transition-colors hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* X / Twitter */}
            <a href="#" className="text-white/40 transition-colors hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="text-white/40 transition-colors hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="text-white/40 transition-colors hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
          <p
            className="uppercase text-white/25"
            style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.3em" }}>
            &copy; Business Today &middot; International Conference 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
