import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  waitlist: defineTable({
    email: v.string(),
    source: v.string(),
    utmSource: v.optional(v.string()),
    utmMedium: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
    utmContent: v.optional(v.string()),
  }).index("by_email", ["email"]),
  contactMessages: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    message: v.string(),
  }).index("by_email", ["email"]),
});
