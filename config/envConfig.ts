import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["DATABASE_URL"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const ENV = {
  DATABASE_URL: process.env.DATABASE_URL as string,
};