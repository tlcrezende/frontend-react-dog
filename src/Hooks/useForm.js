import React from "react";

const useForm = (type) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  const types = {
    email: {
      regex:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Preencha um email válido",
    },
  };

  function validate(value) {
    // se não tem nenhum tipo de entrada no hook, então não tem validação nenhuma, retornando true
    // se o type é do tipo email e não passar na validação do regex, validação falsa
    // se passou em tudo, setError null para não ter nenhuma mensagem de erro e retorna validação válida (true)
    if (type === false) return true;
    if (value.length === 0) {
      setError("Preencha um valor.");
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  // Já valida se tem algum erro enquanto digita, mas só mostra a mensagem quando o onBlur é ativado, isto é, 
  // validação não passou e o usuário saiu do forms
  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  // validate é exportada já trigando a função validate com o argumento value dentro, isto é, chamar validate
  // em outro lugar com este Hook já ativa a função e seu argumento. Assim agora é só chamar o hook.validate, não precisa
  // dar o callback da função nem passar argumento nenhum.
  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
