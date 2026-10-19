/** Subject metadata. Validate external data at runtime before use. */
export interface Subject {
  /** Stable internal identifier, separate from the subject code. */
  id: string;
  subjectCode: string;
  name: string;
  /** Positive integer representing the number of academic credits. */
  credits: number;
  teacherName?: string;
  description?: string;
}
