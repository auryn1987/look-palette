import { ConvexError } from "convex/values";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email: string) {
  const normalized = email.trim().toLowerCase();

  if (!EMAIL_PATTERN.test(normalized)) {
    throw new ConvexError("Invalid email format.");
  }

  return normalized;
}

export function requireText(
  value: string,
  field: string,
  { min = 1, max }: { min?: number; max: number },
) {
  const trimmed = value.trim();

  if (!trimmed) {
    throw new ConvexError("All fields are required.");
  }

  if (trimmed.length < min || trimmed.length > max) {
    if (min <= 1) {
      throw new ConvexError(`${field} must be ${max} characters or less.`);
    }

    throw new ConvexError(
      `${field} must be between ${min} and ${max} characters.`,
    );
  }

  return trimmed;
}
