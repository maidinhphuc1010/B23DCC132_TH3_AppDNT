import type { Student } from './student';
import type { Subject } from './subject';
import type { StudySession } from './studySession';
import type { Assignment } from './assignment';
import type { AcademicResult } from './academicResult';

export interface LearningData {
  student: Student | null;
  subjects: Subject[];
  studySessions: StudySession[];
  assignments: Assignment[];
  academicResults: AcademicResult[];
}

export type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;
