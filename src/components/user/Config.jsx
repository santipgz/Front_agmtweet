import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Global } from "../../helpers/Global";
import Avatar from "../../assets/img/user.png";
import { SerializeForm } from "../../helpers/SerializeForm";

export const Config = () => {
  const [saved, setSaved] = useState("Notsaved");
  const { auth, setAuth } = useAuth();
  const updateUser = async (e) => {
    e.preventDefault();

    let newDataUser = SerializeForm(e.target);

    delete newDataUser.file;

    const request = await fetch(Global.url + "user/update", {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    if (data.status == "success" && data.user) {
      delete data.user.password;
      setAuth(data.user);
      setSaved("Save");
    } else {
      setSaved("Error, not save");
    }

    //Subida de avatar

    const fileInput = document.querySelector("#file");

    if (data.status == "success" && fileInput.files[0]) {
      const formDataVirtual = new FormData();
      formDataVirtual.append("file", fileInput.files[0]);

      //Peticion

      const upload = await fetch(Global.url + "user/upload", {
        method: "POST",
        body: formDataVirtual,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const uploadData = await upload.json();

      if (uploadData.status == "success" && uploadData.user) {
        delete uploadData.user.password;
        setAuth(uploadData.user);
        setSaved("Save");
      } else {
        setSaved("Error, not save");
      }
    }
  };
  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Ajustes</h1>
      </header>
      <div className="settings__container">
        {saved === "Save" ? (
          <strong className="alert alert-success">Usuario actualizado</strong>
        ) : (
          ""
        )}
        {saved === "Error, not save" ? (
          <strong className="alert alert-danger">Usuario no actualizado</strong>
        ) : (
          ""
        )}
        <form className="settings__form" onSubmit={updateUser}>
          <div className="form-group form-group--half">
            <label htmlFor="name" className="form-group__label">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              defaultValue={auth.name}
              className="form-group__input"
            />
          </div>
          <div className="form-group form-group--half">
            <label htmlFor="surname" className="form-group__label">
              Apellidos
            </label>
            <input
              type="text"
              name="surname"
              defaultValue={auth.surname}
              className="form-group__input"
            />
          </div>
          <div className="form-group form-group--half">
            <label htmlFor="nick" className="form-group__label">
              Nickname
            </label>
            <input
              type="text"
              name="nick"
              defaultValue={auth.nick}
              className="form-group__input"
            />
          </div>
          <div className="form-group form-group--half">
            <label htmlFor="email" className="form-group__label">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              defaultValue={auth.email}
              className="form-group__input"
            />
          </div>
          <div className="form-group form-group--full">
            <label htmlFor="biografia" className="form-group__label">
              Biografía
            </label>
            <textarea
              name="biografia"
              defaultValue={auth.biografia}
              className="form-group__textarea"
            />
          </div>
          <div className="form-group form-group--full">
            <label htmlFor="password" className="form-group__label">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              className="form-group__input"
            />
          </div>
          <div className="form-group form-group--full">
            <label htmlFor="file" className="form-group__label">
              Avatar
            </label>
            <div className="avatar-container">
              {auth.image !== "default.png" ? (
                <img
                  src={Global.url + "user/avatar/" + auth.image}
                  className="avatar-container__img"
                  alt="Foto de perfil"
                />
              ) : (
                <img
                  src={Avatar}
                  className="avatar-container__img"
                  alt="Foto de perfil"
                />
              )}
            </div>
            <input
              type="file"
              name="file"
              id="file"
              className="form-group__file-input"
            />
          </div>
          <input type="submit" value="Actualizar" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};
