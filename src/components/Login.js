import React from "react";

function Login() {
  return (
    <form className="user-form">
      <h1 className="user-form__title">Вход</h1>
      <input className="user-form__input" placeholder="Email" type="email" />
      <input
        className="user-form__input"
        placeholder="Пароль"
        type="password"
      />
      <button className="user-form__button" type="submit">
        Войти
      </button>
    </form>
  );
}

export default Login;
