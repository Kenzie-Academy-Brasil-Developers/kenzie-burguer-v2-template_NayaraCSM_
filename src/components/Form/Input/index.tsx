import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

import { StyledInputContainer } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typography";
interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "number";
  error?: FieldError;
}

const Input = forwardRef(
  (
    { id, label, type, error, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <div>
      <StyledInputContainer>
        <input type={type} id={id} placeholder=" " ref={ref} {...rest} />
        <label htmlFor={id}>{label}</label>
      </StyledInputContainer>
      {error ? (
        <StyledParagraph fontColor="red">{error.message}</StyledParagraph>
      ) : null}
    </div>
  )
);

export default Input;
