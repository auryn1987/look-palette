import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { normalizeEmail } from "./validation";

function normalizeUtm(value: string | undefined, field: string) {
  const normalized = value?.trim();

  if (!normalized) {
    return undefined;
  }

  if (normalized.length > 250) {
    throw new ConvexError(`${field} must be 250 characters or less.`);
  }

  return normalized;
}

export const subscribe = mutation({
  args: {
    email: v.string(),
    source: v.optional(v.string()),
    utmSource: v.optional(v.string()),
    utmMedium: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
    utmContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = normalizeEmail(args.email);
    const source = args.source?.trim() || "site";
    const utmSource = normalizeUtm(args.utmSource, "UTM source");
    const utmMedium = normalizeUtm(args.utmMedium, "UTM medium");
    const utmCampaign = normalizeUtm(args.utmCampaign, "UTM campaign");
    const utmContent = normalizeUtm(args.utmContent, "UTM content");

    if (source.length > 100) {
      throw new ConvexError("Invalid signup source.");
    }

    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (existing) {
      return { alreadySubscribed: true };
    }

    await ctx.db.insert("waitlist", {
      email,
      source,
      ...(utmSource ? { utmSource } : {}),
      ...(utmMedium ? { utmMedium } : {}),
      ...(utmCampaign ? { utmCampaign } : {}),
      ...(utmContent ? { utmContent } : {}),
    });
    return { alreadySubscribed: false };
  },
});
