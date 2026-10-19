/** Basic student profile. Runtime validation is required for external data. */
export type StudentUpdate = Partial<Omit<Student, 'id'>>;

export interface Student {
  /** Stable internal identifier, separate from the institution's student code. */
  id: string;
  /** String preserves leading zeros in student codes. */
  studentCode: string;
  fullName: string;
  email: string;
  phone?: string;
  /** Calendar date in YYYY-MM-DD format, not a Date instance. */
  dateOfBirth?: string;
  className?: string;
  major?: string;
  avatarUrl?: string;
}
