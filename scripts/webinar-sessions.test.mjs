import assert from "node:assert/strict";
import test from "node:test";
import { getUpcomingWebinars, formatWebinarDate } from "../src/data/webinars.ts";

test("shows the three planned sessions before launch", () => {
  assert.equal(getUpcomingWebinars(Date.parse("2026-10-22T12:00:00Z")).length, 3);
});
test("advances to December when November registration closes", () => {
  assert.equal(getUpcomingWebinars(Date.parse("2026-11-26T11:14:59Z")).length, 3);
  assert.equal(getUpcomingWebinars(Date.parse("2026-11-26T11:15:00Z"))[0], "2026-12-17T12:30:00+01:00");
});
test("stops offering expired sessions after the last registration cutoff", () => {
  assert.deepEqual(getUpcomingWebinars(Date.parse("2027-01-21T11:15:00Z")), []);
});
test("formats dates in Paris independently of visitor timezone", () => {
  assert.equal(formatWebinarDate("2026-11-26T12:30:00+01:00"), "jeudi 26 novembre 2026");
});
