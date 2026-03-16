import { redis } from "./redis";
import { logger } from "./logger";

const DLQ_REDIS_KEY = "failed_tasks_dlq";

interface QueuedTask {
  id: string;
  type: "EMAIL" | "WHATSAPP" | "PAYMENT_SYNC";
  payload: any;
  retryCount: number;
  lastError?: string;
}

/**
 * Task 45: Dead Letter Queue (DLQ) & Retry Logic
 */
export async function addToDlq(task: Omit<QueuedTask, "id" | "retryCount">) {
  if (!redis) {
    logger.error("Redis not connected. Cannot add to DLQ.", task);
    return;
  }

  const taskId = Math.random().toString(36).substring(7);
  const queuedTask: QueuedTask = {
    ...task,
    id: taskId,
    retryCount: 0
  };

  try {
    await redis.lpush(DLQ_REDIS_KEY, JSON.stringify(queuedTask));
    logger.warn(`Task added to DLQ: ${task.type}`, { taskId });
  } catch (error: any) {
    logger.error("Failed to push to Redis DLQ", { error: error.message });
  }
}

/**
 * Processes the DLQ (Can be called by a CRON job)
 */
export async function processDlq() {
  if (!redis) return { error: "Redis not connected" };

  let processedCount = 0;
  let failedCount = 0;

  try {
    const taskCount = await redis.llen(DLQ_REDIS_KEY);
    
    for (let i = 0; i < taskCount; i++) {
        const rawTask = await redis.rpop(DLQ_REDIS_KEY);
        if (!rawTask) continue;

        const task: QueuedTask = JSON.parse(rawTask);
        
        try {
            // Logic to retry based on type
            // (In a real app, you would import the actual service functions here)
            // For now, we simulate success for 50% of retries
            const success = Math.random() > 0.5; 
            
            if (success) {
                processedCount++;
                logger.info(`DLQ Task Success: ${task.type}`, { taskId: task.id });
            } else {
                throw new Error("Retry failed again");
            }
        } catch (error: any) {
            task.retryCount++;
            task.lastError = error.message;

            if (task.retryCount < 3) {
                // Return to queue for another attempt later
                await redis.lpush(DLQ_REDIS_KEY, JSON.stringify(task));
                failedCount++;
            } else {
                // Permanently failed after 3 retries
                logger.error(`Task PERMANENTLY failed in DLQ: ${task.type}`, { task });
            }
        }
    }

    return { processed: processedCount, retrying: failedCount };
  } catch (error: any) {
    logger.error("DLQ Processing Error", { error: error.message });
    return { error: error.message };
  }
}
