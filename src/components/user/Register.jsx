import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";

export function Register() {
  //Llamar a hook por separado
  const { form, changed } = useForm({});

  const [saved, setSaved] = useState("Not saved");

  //Funcion que guarda usuario
  const saveUser = async (e) => {
    e.preventDefault();

    //Recoger form, que corresponse con el useState
    let newUser = form;
    console.log(newUser);

    //Guardar user en el backend

    try {
      const request = await fetch(Global.url + "user/register", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await request.json();

      if (data.status === "success") {
        setSaved("Save");
      } else {
        setSaved("Error, not save");
        console.log("Error, not save");
      }

      console.log(data);
    } catch (error) {
      setSaved("Error, not save");
      console.error("An error occurred:", error);
    }
  };
  return (
    <>
      {/* <header className="content__header content__header--public">
        <h1 className="content__title">Registro</h1>
      </header> */}
      <div className="login-wrapper">
        <div className="login-image"></div>
        <div className="login-form-container register">
          {saved == "Save" ? (
            <strong className="alert alert-success">Usuario Registrado</strong>
          ) : (
            ""
          )}
          {saved == "Error, not save" ? (
            <strong className="alert alert-danger">
              Usuario no registrado
            </strong>
          ) : (
            ""
          )}
          <form className="form-login " onSubmit={saveUser}>
            <div className="form-login__group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                onChange={changed}
                className="form-login__input"
              />
            </div>
            <div className="form-login__group">
              <label htmlFor="surname">Apellidos</label>
              <input
                type="text"
                name="surname"
                onChange={changed}
                className="form-login__input"
              />
            </div>
            <div className="form-login__group">
              <label htmlFor="nick">Nickname</label>
              <input
                type="text"
                name="nick"
                onChange={changed}
                className="form-login__input"
              />
            </div>
            <div className="form-login__group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={changed}
                className="form-login__input"
              />
            </div>
            <div className="form-login__group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                onChange={changed}
                className="form-login__input"
              />
            </div>
            <input
              type="submit"
              value="Registrate en AGMTWEET"
              className="btn btn-success"
            />
          </form>
        </div>
      </div>
    </>
  );
}
