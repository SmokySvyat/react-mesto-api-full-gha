import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.js";
import AuthForm from "./AuthForm.js";


function Register({ handleRegister }) {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/sign-in");
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

  const { password, email } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ password, email });
  };

  return (
    <>
      <Header value={'Вход'} onClick={goToLogin}/>
      
      <form className="auth" onSubmit={handleSubmit}>
        <h2 className="auth__title">Регистрация</h2>
        <input
          className="auth__input"
          placeholder="Email"
          onChange={handleChange}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formValue.email}
        ></input>
        <input
          className="auth__input"
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={formValue.password}
          onChange={handleChange}
          required
        ></input>
        <button className="auth__btn" type="submit">
          Зарегестрироваться
        </button>
        <span className="auth__span">Уже зарегистрированны? 
            <a className="auth__link" onClick={goToLogin}> Войти</a>
        </span>
      </form>
    </>
  );
}

export default Register;