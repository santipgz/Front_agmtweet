import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";

export function Register() {
  //Llamar a hook por separado
  const { form, changed } = useForm({});

  const [saved, setSaved] = useState("Not saved")

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
      <header className="content__header content__header--public">
        <h1 className="content__title">Registro</h1>
      </header>
      <div className="content__posts">
        {saved == "Save" ?
          <strong className="alert alert-success">Usuario Registrado </strong>
          : ''}
        {saved == "Error, not save" ?
          <strong className="alert alert-danger">Usuario no registrado</strong>
          : ""}
        <form className="register-form" onSubmit={saveUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellidos</label>
            <input type="text" name="surname" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="nick">Nickname</label>
            <input type="text" name="nick" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electronico</label>
            <input type="email" name="email" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={changed} />
          </div>
          <input
            type="submit"
            value="Registrarte"
            className="btn btn-success"
          />
        </form>
      </div>
    </>
  );
}
