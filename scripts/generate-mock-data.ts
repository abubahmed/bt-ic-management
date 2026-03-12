import { faker } from "@faker-js/faker";
import Papa from "papaparse";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

faker.seed(2026);

const OUT_DIR = join(import.meta.dir, "..", "mock-data");
mkdirSync(OUT_DIR, { recursive: true });

const NUM_PEOPLE = 10;
const NUM_EVENTS = 10;
const MAX_PER_EVENT = 10;
const NUM_ANNOUNCEMENTS = 5;
const NUM_RESOURCES = 5;

// Data pools
const ORGS = [
  "Princeton University", "Yale University", "Columbia University", "Stanford University",
  "MIT", "Harvard University", "NYU", "UPenn", "Duke University", "Brown University",
  "Cornell University", "Dartmouth College", "UChicago", "Northwestern", "Georgetown",
  "UVA", "Rutgers", "Johns Hopkins",
];
const TEAMS = ["attendee", "tech", "admin", "logistics"];
const GRADES = ["Freshman", "Sophomore", "Junior", "Senior"];
const ROOMS = ["101", "102", "201", "202", "301", "302", "401", "402", "501", "502"];
const VISIBILITIES = [...TEAMS, "shared"];
const DAYS = ["Day 1 - Nov 8", "Day 2 - Nov 9", "Day 3 - Nov 10"];
const TIME_SLOTS = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

// Generate people
const people: Record<string, string>[] = [];
const usedEmails = new Set<string>();

for (let i = 0; i < NUM_PEOPLE; i++) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const org = faker.helpers.arrayElement(ORGS);
  let email = faker.internet.email({ firstName, lastName, provider: `${org.toLowerCase().replace(/\s+/g, "")}.edu` });
  while (usedEmails.has(email)) {
    email = faker.internet.email({ firstName, lastName: lastName + faker.number.int(99), provider: `${org.toLowerCase().replace(/\s+/g, "")}.edu` });
  }
  usedEmails.add(email);

  people.push({
    name: `${firstName} ${lastName}`,
    email,
    phone: faker.phone.number({ style: "national" }),
    team: i < 8 ? faker.helpers.arrayElement(TEAMS) : "",
    organization: org,
    grade: faker.helpers.arrayElement(GRADES),
  });
}

writeFileSync(join(OUT_DIR, "people.csv"), Papa.unparse(people));

// Generate schedule events
const events: Record<string, string>[] = [];

for (let i = 0; i < NUM_EVENTS; i++) {
  const startIdx = faker.number.int({ min: 0, max: TIME_SLOTS.length - 2 });
  const endIdx = faker.number.int({ min: startIdx + 1, max: Math.min(startIdx + 2, TIME_SLOTS.length - 1) });

  events.push({
    title: faker.helpers.arrayElement([
      "Keynote", "Panel", "Workshop", "Fireside Chat", "Networking", "Seminar", "Reception",
    ]) + ": " + faker.company.buzzPhrase(),
    description: faker.lorem.sentence({ min: 8, max: 20 }),
    speaker: faker.helpers.maybe(() => faker.person.firstName() + " " + faker.person.lastName(), { probability: 0.6 }) || "",
    day: faker.helpers.arrayElement(DAYS),
    startTime: TIME_SLOTS[startIdx],
    endTime: TIME_SLOTS[endIdx],
    room: `Room ${faker.helpers.arrayElement(ROOMS)}`,
    zoomUrl: faker.helpers.maybe(() => `https://zoom.us/j/${faker.number.int({ min: 1000000000, max: 9999999999 })}`, { probability: 0.3 }) || "",
  });
}

writeFileSync(join(OUT_DIR, "schedule-events.csv"), Papa.unparse(events));

// Generate schedule assignments — distribute all people evenly across events, capped by MAX_PER_EVENT
const assignments: Record<string, string>[] = [];
const perEvent = Math.min(Math.floor(NUM_PEOPLE / NUM_EVENTS), MAX_PER_EVENT);
const shuffledPeople = faker.helpers.shuffle([...people]);
let cursor = 0;

for (const event of events) {
  for (let i = 0; i < perEvent; i++) {
    const person = shuffledPeople[cursor % shuffledPeople.length];
    assignments.push({
      personName: person.name,
      personEmail: person.email,
      eventTitle: event.title,
    });
    cursor++;
  }
}

writeFileSync(join(OUT_DIR, "schedule-assignments.csv"), Papa.unparse(assignments));

// Generate announcements
const announcements: Record<string, string>[] = [];

for (let i = 0; i < NUM_ANNOUNCEMENTS; i++) {
  const author = faker.helpers.arrayElement(people);
  announcements.push({
    title: faker.lorem.sentence({ min: 3, max: 7 }).replace(/\.$/, ""),
    message: faker.lorem.paragraph({ min: 1, max: 3 }),
    visibility: faker.helpers.arrayElement(VISIBILITIES),
    authorEmail: author.email,
  });
}

writeFileSync(join(OUT_DIR, "announcements.csv"), Papa.unparse(announcements));

// Generate resources
const resources: Record<string, string>[] = [];

for (let i = 0; i < NUM_RESOURCES; i++) {
  const author = faker.helpers.arrayElement(people);
  const title = faker.lorem.words({ min: 2, max: 4 });
  resources.push({
    title: title.charAt(0).toUpperCase() + title.slice(1),
    description: faker.lorem.sentence(),
    visibility: faker.helpers.arrayElement(VISIBILITIES),
    authorEmail: author.email,
    url: `https://bt-ic-resources.s3.amazonaws.com/${faker.system.fileName()}`,
  });
}

writeFileSync(join(OUT_DIR, "resources.csv"), Papa.unparse(resources));

// Generate room assignments
const roomAssignments = people.map((p) => ({
  email: p.email,
  roomNumber: faker.helpers.arrayElement(ROOMS),
}));

writeFileSync(join(OUT_DIR, "room-assignments.csv"), Papa.unparse(roomAssignments));

// Generate QR codes
const qrCodes = people.map((p) => ({
  email: p.email,
  qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(p.email)}`,
}));

writeFileSync(join(OUT_DIR, "qr-codes.csv"), Papa.unparse(qrCodes));

console.log(`Generated mock data in ${OUT_DIR}:`);
console.log(`  - people.csv (${people.length} rows)`);
console.log(`  - schedule-events.csv (${events.length} rows)`);
console.log(`  - schedule-assignments.csv (${assignments.length} rows)`);
console.log(`  - announcements.csv (${announcements.length} rows)`);
console.log(`  - resources.csv (${resources.length} rows)`);
console.log(`  - room-assignments.csv (${roomAssignments.length} rows)`);
console.log(`  - qr-codes.csv (${qrCodes.length} rows)`);
