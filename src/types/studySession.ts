import type {Subject} from './subject';

/** One scheduled class, not a recurring timetable rule. */
export interface StudySession {
  id: string;
  subjectId: Subject['id'];
  /** Local calendar date in YYYY-MM-DD format. */
  date: string;
  /** Local 24-hour time in HH:mm format (Asia/Ho_Chi_Minh). */
  startTime: string;
  /** HH:mm, strictly after startTime on the same date; no overnight classes. */
  endTime: string;
  room: string;
  topic?: string;
  notes?: string;
}
