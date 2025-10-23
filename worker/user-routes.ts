import { Hono } from "hono";
import type { Env } from './core-utils';
import { LeadEntity } from "./entities";
import { ok, bad, isStr } from './core-utils';
import type { Lead } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // LEAD GENERATION
  app.post('/api/leads', async (c) => {
    const { name, email, message } = (await c.req.json()) as Partial<Pick<Lead, 'name' | 'email' | 'message'>>;
    if (!isStr(name) || !isStr(email) || !isStr(message)) {
      return bad(c, 'Name, email, and message are required.');
    }
    // Basic email validation
    if (!/.+@.+\..+/.test(email)) {
        return bad(c, 'Invalid email format.');
    }
    const leadData: Lead = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: Date.now(),
    };
    const lead = await LeadEntity.create(c.env, leadData);
    return ok(c, lead);
  });
}