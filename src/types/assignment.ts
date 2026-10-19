import type {Subject} from './subject';

export type AssignmentStatus = 'todo' | 'in_progress' | 'completed';

/** Assignment metadata; validate external data at runtime before use. */
export interface Assignment {
  id: string;
  subjectId: Subject['id'];
  title: string;
  description?: string;
  /** ISO 8601 datetime with explicit timezone, e.g. 2026-10-25T23:59:00+07:00. */
  dueAt: string;
  /** Progress only. Overdue is derived from dueAt and status, not stored. */
  status: AssignmentStatus;
}
