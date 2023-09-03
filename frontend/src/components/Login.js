import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.js";
import AuthForm from "./AuthForm.js";

function Login({ handleLogin }) {
  const navigate = useNavigate();

  const goToRegistration = () => {
    navigate("/sign-up");
  };

  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const { email, password } = formValue;

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValue.email || !formValue.password) {
      setErrorMessage("Both fields are required");
      return;
    }
    handleLogin({ email, password });
  };

  return (
    <>
      <Header value={'Регистрация'} onClick={goToRegistration}/>

      <AuthForm
        title={'Вход'}
        btnValue={'Войти'}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formValue={formValue}
      />
    </>
  );
}

export default Login;