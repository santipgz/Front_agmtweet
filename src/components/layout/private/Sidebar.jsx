import React, { useState } from "react";
import Avatar from "../../../assets/img/user.png";
import { Global } from "../../../helpers/Global";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";

export const Sidebar = () => {
  const { auth, counters } = useAuth();
  const { form, changed } = useForm({});
  const [stored, setStored] = useState("Not stored");

  console.log(auth);
  console.log(counters);
  const savePublication = async (e) => {
    e.preventDefault();
    let newPublication = form;
    newPublication.user = auth._id;

    const request = await fetch(Global.url + "publication/save", {
      method: "POST",
      body: JSON.stringify(newPublication),
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();

    if ((data.status = "success")) {
      setStored("stored");
    } else {
      setStored("error");
    }

    const fileInput = document.querySelector("#file");

    console.log(fileInput);
    console.log(fileInput.files[0]);

    if ((data.status = "success" && fileInput.files[0])) {
      const formData = new FormData();
      formData.append("archivo", fileInput.files[0]);

      const uploadrequest = await fetch(
        Global.url + "publication/upload/" + data.publicationStored._id,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const uploadData = await uploadrequest.json();
      if (uploadData.status == "success") {
        setStored("stored");
      } else {
        setStored("error");
      }

    
    }
    const myform = document.querySelector("#publication-form");
    myform.reset();
  };
  return (
    <aside className="layout__aside">
      <header className="aside__header">
        <h1 className="aside__title">Hola, {auth.name}</h1>
      </header>

      <div className="aside__container">
        <div className="aside__profile-info">
          <div className="profile-info__general-info">
            <div className="general-info__container-avatar">
              {auth.image != "default.png" && (
                <img
                  src={Global.url + "user/avatar/" + auth.image}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}
              {auth.image == "default.png" && (
                <img
                  src={Avatar}
                  className="container-avatar__img"
                  alt="Foto de perfil"
                />
              )}
            </div>

            <div className="general-info__container-names">
              <Link
                to={"/social/perfil/" + auth._id}
                className="container-names__name"
              >
                {auth.name}
              </Link>
              <p className="container-names__nickname">{auth.nick}</p>
            </div>
          </div>

          <div className="profile-info__stats">
            <div className="stats__following">
              <Link
                to={"/social/siguiendo/" + auth._id}
                className="following__link"
              >
                <span className="following__title">Siguiendo</span>
                <span className="following__number">{counters.following}</span>
              </Link>
            </div>
            <div className="stats__following">
              <Link
                to={"/social/seguidores/" + auth._id}
                className="following__link"
              >
                <span className="following__title">Seguidores</span>
                <span className="following__number">{counters.followed}</span>
              </Link>
            </div>

            <div className="stats__following">
              <Link
                to={"/social/perfil/" + auth._id}
                className="following__link"
              >
                <span className="following__title">Publicaciones</span>
                <span className="following__number">
                  {counters.publications}
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="aside__container-form">
          {stored == "stored" ? (
            <strong className="alert alert-success">
              Publicado correctamente{" "}
            </strong>
          ) : (
            ""
          )}
          {stored == "error" ? (
            <strong className="alert alert-danger">
              No se ha podido publicar
            </strong>
          ) : (
            ""
          )}
          <form
            id="publication-form"
            className="container-form__form-post"
            onSubmit={savePublication}
          >
            <div className="form-post__inputs">
              <label htmlFor="text" className="form-post__label">
                ¿Que estas pesando hoy?
              </label>
              <textarea
                name="text"
                className="form-post__textarea"
                onChange={changed}
              ></textarea>
            </div>

            <div className="form-post__inputs">
              <label htmlFor="image" className="form-post__label">
                Sube tu foto
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className="form-post__image"
              />
            </div>

            <input
              type="submit"
              value="Enviar"
              className="form-post__btn-submit"
            />
          </form>
        </div>
      </div>
    </aside>
  );
};
