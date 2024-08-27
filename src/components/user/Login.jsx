import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export const Login = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("");
  const { setAuth } = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();
    console.log(form);
    let userToLogin = form;

    //Peticion user en el backend

    try {
      const request = await fetch(Global.url + "user/login", {
        method: "POST",
        body: JSON.stringify(userToLogin),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await request.json();
      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSaved("login");

        //  Seat datos en auth
        setAuth(data.user);

        //Redirección

        setTimeout(() => {
          window.location.href = "/";
        }, 1200);
      } else {
        setSaved("error");
      }
      console.log(data);
    } catch (error) {
      setSaved("error");
      console.error("An error occurred:", error);
    }
  };
  return (
    <>
      {/*    <header className="content__header content__header--public">
      <h1 className="content__title">Login</h1>
    </header> */}
      <div className="login-wrapper">
        <div className="login-image"></div>
        <div className="login-form-container">
          {saved === "login" && (
            <div className="alert alert-success">
              usuario identificado correctamente
            </div>
          )}
          {saved === "error" && (
            <div className="alert alert-danger">
              email o contraseña incorrectos
            </div>
          )}
          <form className="form-login" onSubmit={loginUser}>
            {/*       <h1 className="form-login__title">Iniciar Sesión</h1>
             */}{" "}
            <div className="form-login__group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-login__input"
                onChange={changed}
                required
              />
            </div>
            <div className="form-login__group">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className="form-login__input"
                onChange={changed}
                required
              />
            </div>
            <button type="submit" className="form-login__submit">
              Acceder a <b>AGMTWEET</b>
            </button>
          </form>
        </div>
       
      </div>
      <p>* La primera peticion al back que se realiza (normalmente login o registro) tardara unos 50 segundos en responder.</p>
      <p>Debido a las limitaciones del hosting gratuito render. Documentado en Memoria.</p>
    </>
  );
};
