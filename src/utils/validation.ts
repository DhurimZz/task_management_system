export const TITLE_MAX_LENGTH = 80;
export const DESCRIPTION_MAX_LENGTH = 300;

export interface TaskInput {
  title: string;
  description: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: {
    title?: string;
    description?: string;
  };
}

export function validateTaskInput(input: TaskInput): ValidationResult {
  const errors: ValidationResult['errors'] = {};
  const title = input.title.trim();
  const description = input.description.trim();

  if (title.length === 0) {
    errors.title = 'Title is required.';
  } else if (title.length > TITLE_MAX_LENGTH) {
    errors.title = `Title must be ${TITLE_MAX_LENGTH} characters or fewer.`;
  }

  if (description.length > DESCRIPTION_MAX_LENGTH) {
    errors.description = `Description must be ${DESCRIPTION_MAX_LENGTH} characters or fewer.`;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
