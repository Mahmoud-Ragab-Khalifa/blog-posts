import { ValidationErrors } from "./validationErrors";

export type ActionState = {
  errors?: ValidationErrors;
  status?: number | null;
  message?: string;
  formData?: FormData | null;
};
