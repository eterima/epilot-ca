import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

type Props = {
  label: string;
  errorMessage: string | undefined;
  name: string;
  type: string;
  isInvalid: boolean;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputWithValidation = ({
  type,
  label,
  name,
  isInvalid,
  errorMessage,
  value,
  onChange,
}: Props) => {
  return (
    <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
      <Form.Control
        onChange={onChange}
        isInvalid={isInvalid}
        type={type}
        name={name}
        placeholder={label}
        value={value}
      />
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </FloatingLabel>
  );
};
