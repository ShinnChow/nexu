import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

const databaseUrl = process.env.DATABASE_URL ?? "file:./nexu.db";
const dbPath = databaseUrl.replace(/^file:/, "");

export const auth = betterAuth({
  database: new Database(dbPath),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [process.env.WEB_URL ?? "http://localhost:5173"],
});
