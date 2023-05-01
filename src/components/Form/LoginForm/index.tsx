import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { schema, TLoginFormValues } from "./validator";
import { UserContext } from "../../../providers/UserContext";
import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(schema),
  });

  const { userLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const submit: SubmitHandler<TLoginFormValues> = (formData) => {
    userLogin(formData, setLoading);
    console.log(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        id="login"
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email}
      />
      <Input
        id="senha"
        label="Senha"
        type="password"
        {...register("password")}
        error={errors.password}
      />
      <StyledButton
        $buttonSize="default"
        $buttonStyle="green"
        type="submit"
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
