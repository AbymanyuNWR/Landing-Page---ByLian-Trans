import { db } from "./prisma";

type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG";

/**
 * Task 43: Structured Logging
 */
export const logger = {
  info: (message: string, meta?: any) => log("INFO", message, meta),
  warn: (message: string, meta?: any) => log("WARN", message, meta),
  error: (message: string, meta?: any) => log("ERROR", message, meta),
  debug: (message: string, meta?: any) => log("DEBUG", message, meta),
};

function log(level: LogLevel, message: string, meta?: any) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...(meta && { meta }),
  };

  if (process.env.NODE_ENV === "development") {
    const color = level === "ERROR" ? "\x1b[31m" : level === "WARN" ? "\x1b[33m" : "\x1b[32m";
    console.log(`${color}[${level}]\x1b[0m ${timestamp}: ${message}`, meta || "");
  } else {
    // In production, we might send this to a service like Axiom, BetterStack, or just stdout
    console.log(JSON.stringify(logEntry));
  }
}

/**
 * Task 42: Audit Logging for Admin Actions
 */
export async function createAuditLog({
  userId,
  action,
  target,
  details
}: {
  userId: string;
  action: string;
  target: string;
  details?: any;
}) {
  try {
    return await db.auditLog.create({
      data: {
        userId,
        action,
        target,
        details: details ? JSON.stringify(details) : undefined,
      }
    });
  } catch (error: any) {
    logger.error("Failed to create audit log", { error: error.message, action, userId });
    return null;
  }
}
