import React from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate;

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem("token");
      navigate("/login");
    },
    [navigate]
  );

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    console.log("🚀 ~ file: UserContext.js:16 ~ getUser ~ json:", json);

    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const json = await response.json();
      window.localStorage.setItem("token", json.token);
      await getUser(json.token);
      navigate("/conta");
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      try {
        setError(null);
        setLoading(true);
        const { url, options } = TOKEN_VALIDATE_POST(token);
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Token inválido");
        }
        // se o erro for gerado em cima ele pula direto pro bloco catch
        await getUser(token);
      } catch (err) {
        userLogout();
      } finally {
        setLoading(false);
      }
      if (token) {
      }
    }
    autoLogin();
  }, [userLogout]);
  return (
    <UserContext.Provider
      value={{ userLogin, data, userLogout, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
