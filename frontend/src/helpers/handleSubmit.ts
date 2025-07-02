import {FormikHelpers} from 'formik';
import {RegistrationFormValues} from '../types/registrationFormValues.interface';
import apiClient from '../config/api';

export const handleSubmit = async (
  values: RegistrationFormValues,
  { setSubmitting, setErrors }: FormikHelpers<RegistrationFormValues>
) => {
  try {
    await apiClient.post('/auth/register', values);
    setSubmitting(false);
    return true; // успіх
  } catch (error: any) {
    setSubmitting(false);
    if (error.response && error.response.data) {
      setErrors({ email: error.response.data.message || 'Помилка реєстрації' } as any);
    }
    return false; // помилка
  }
};