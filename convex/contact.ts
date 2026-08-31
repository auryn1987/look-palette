import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { normalizeEmail, requireText } from "./validation";

export const submit = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const firstName = requireText(args.firstName, "First name", { max: 50 });
    const lastName = requireText(args.lastName, "Last name", { max: 50 });
    const email = normalizeEmail(args.email);
    const message = requireText(args.message, "Message", {
      min: 10,
      max: 1000,
    });

    await ctx.db.insert("contactMessages", {
      firstName,
      lastName,
      email,
      message,
    });
  },
});
