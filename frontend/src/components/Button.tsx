import React from 'react';

interface ButtonProps {
    isSubmitting: boolean;
    className: string;
    type: 'submit' | 'button' | 'reset';
    disabled: boolean;
}

const Button = ({isSubmitting, className, type, disabled}: ButtonProps) => {
  return (
    <div>
      <button type="submit" disabled={isSubmitting} className="registration-form-button">Зареєструватися</button>
    </div>
  )
}

export default Button
