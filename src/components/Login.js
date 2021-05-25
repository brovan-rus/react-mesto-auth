import React from "react";
import UserForm from "./UserForm";

function Login({ title, buttonText, onLogin }) {
  return <UserForm title={title} buttonText={buttonText} onSubmit={onLogin} />;
}
export default Login;
