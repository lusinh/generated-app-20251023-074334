
import { IndexedEntity } from "./core-utils";
import type { Lead } from "@shared/types";



// LEAD ENTITY: one DO instance per lead
export class LeadEntity extends IndexedEntity<Lead> {
  static readonly entityName = "lead";
  static readonly indexName = "leads";
  static readonly initialState: Lead = { id: "", name: "", email: "", message: "", createdAt: 0 };
}