import React from "react";
import { Link } from "react-router-dom";
import Button from "../Form/Button";
import Input from "../Form/Input";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    // sempre lembrar de prevenir o default antes de fazer um fetch
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <div>
      Login Form
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input
          label={"Usuário"}
          type={"text"}
          name={"username"}
          {...username}
        />
        <Input
          label={"Senha"}
          type={"password"}
          name={"password"}
          {...password}
        />
        <Button>Entrar</Button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </div>
  );
};

export default LoginForm;
