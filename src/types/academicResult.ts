import type {Subject} from './subject';

/** Assessment component and its contribution to the subject's final grade. */
export interface GradeWeight {
  /** Unique within a single academic result. */
  id: string;
  name: string;
  /** Percentage in (0, 100]; all components in a result must sum to 100. */
  weight: number;
}

export interface GradeComponent extends GradeWeight {
  /** Score on a 0-10 scale. null means ungraded, not zero. */
  score: number | null;
}

/** One subject result per term for the current student's profile. */
export interface AcademicResult {
  id: string;
  subjectId: Subject['id'];
  /** Academic year in YYYY-YYYY format, e.g. 2026-2027. */
  academicYear: string;
  semester: 1 | 2 | 3;
  components: GradeComponent[];
  notes?: string;
  // Final score is derived as sum(score * weight / 100) only when all are graded.
  // Validate external data at runtime; interfaces do not enforce numeric ranges.
}
