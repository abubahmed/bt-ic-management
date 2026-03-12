"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeading from "../components/staff/SectionHeading";
import EmptyState from "../components/staff/EmptyState";
import PeopleSection from "../components/staff/PeopleSection";

const SECTIONS = [
  { id: "people", label: "People & Access" },
  { id: "schedules", label: "Schedules" },
  { id: "rooms", label: "Room Assignments" },
  { id: "announcements", label: "Announcements" },
  { id: "qrcodes", label: "QR Codes" },
  { id: "resources", label: "Resource Library" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export default function StaffDashboardPage() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

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
          <p className="mt-1 text-white/50" style={{ fontSize: "15px", fontWeight: 400, lineHeight: 1.7 }}>
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

        {activeSection === "people" && <PeopleSection />}

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
