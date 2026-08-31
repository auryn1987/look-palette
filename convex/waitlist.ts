import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { normalizeEmail } from "./validation";

export const subscribe = mutation({
  args: {
    email: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = normalizeEmail(args.email);
    const source = args.source?.trim() || "site";

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

    await ctx.db.insert("waitlist", { email, source });
    return { alreadySubscribed: false };
  },
});
