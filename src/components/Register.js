import { Link } from "react-router-dom";

function Register() {
  return (
    <form className="user-form user-form_place_register">
      <h1 className="user-form__title">Регистрация</h1>
      <input className="user-form__input" placeholder="Email" type="email" />
      <input
        className="user-form__input"
        placeholder="Пароль"
        type="password"
      />
      <button className="user-form__button" type="submit">
        Зарегистрироваться
      </button>
      <div className="user-form__ending-container">
        <span className="user-form__ending">Уже зарегистрированы?</span>
        <Link className="user-form__link" to="/sing-in">
          Войти
        </Link>
      </div>
    </form>
  );
}

export default Register;
