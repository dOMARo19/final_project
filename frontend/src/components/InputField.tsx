import React from 'react';
import { ErrorMessage, Field } from 'formik';
import { FormikFieldState } from '../types/formikFieldState';

interface InputFieldProps {
  name: string
  type: string
  placeholder: string
  label: string
  touched: FormikFieldState
  errors: FormikFieldState
  disabled?: boolean
  readOnly?: boolean
  autoComplete?: string
  className?: string
}

const InputField = ({
  name,
  type,
  placeholder,
  label,
  touched,
  errors,
  disabled,
  readOnly,
  autoComplete = 'off',
  className
}: InputFieldProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      <Field
        id={name}
        type={type}
        className={`form-input ${
          touched[name] && errors[name]
            ? 'is-invalid'
            : touched[name] && !errors[name]
              ? 'is-valid'
              : ''
        } ${className || ''}`}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
      />
      {touched[name] && errors[name] ? (
        <ErrorMessage
          name={name}
          component="div"
          className="invalid-feedback"
        />
      ) : null}
    </div>
  )
}

export default InputField