import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { schema, TRegisterFormValues } from "./validator";
import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { UserContext } from "../../../providers/UserContext";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormValues>({
    resolver: zodResolver(schema),
  });

  const { userRegister } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const submit: SubmitHandler<TRegisterFormValues> = (formData) => {
    userRegister(formData, setLoading);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input id="name" label="Nome" type="text" {...register("name")} error={errors.name} />
      <Input
        id="email"
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email}
      />
      <Input
        id="password"
        label="Senha"
        type="password"
        {...register("password")}
        error={errors.password}
      />
      <Input
        id="confirmPassword"
        label="Confirmar Senha"
        type="password"
        {...register("confirm")}
        error={errors.confirm}
      />
      <StyledButton
        $buttonSize="default"
        $buttonStyle="gray"
        type="submit"
        disabled={loading}
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
