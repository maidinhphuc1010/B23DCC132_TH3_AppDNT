import type { Student, StudentUpdate } from '../types/student';

const requiredFields = ['studentCode', 'fullName', 'email'] as const;
const optionalFields = [
  'phone',
  'dateOfBirth',
  'className',
  'major',
  'avatarUrl',
] as const;

/** Merge a partial profile update without mutating the original or changing its ID. */
export function mergeStudent(
  current: Student | null,
  changes: StudentUpdate,
): Student {
  if (!changes || typeof changes !== 'object' || Array.isArray(changes)) {
    throw new Error('Thông tin sinh viên không hợp lệ.');
  }
  const next: Student = current
    ? { ...current }
    : {
        id: 'student-local',
        studentCode: '',
        fullName: '',
        email: '',
      };
  for (const key of [...requiredFields, ...optionalFields]) {
    const value = changes[key];
    if (value === undefined) {
      continue;
    }
    if (typeof value !== 'string') {
      throw new Error(`Trường ${key} phải là chuỗi.`);
    }
    next[key] = value.trim();
  }
  for (const key of requiredFields) {
    if (!next[key]) {
      throw new Error(`Vui lòng nhập ${key}.`);
    }
  }
  for (const key of optionalFields) {
    if (next[key] === '') {
      delete next[key];
    }
  }
  return next;
}
