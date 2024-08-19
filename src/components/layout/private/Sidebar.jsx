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
    <aside className="sidebar">
      <header className="sidebar__header">
        <h1 className="sidebar__title">Hola, {auth.name}</h1>
      </header>

      <div className="sidebar__content">
        <div className="profile">
          <div className="profile__info">
            <div className="profile__avatar-container">
              {auth.image !== "default.png" ? (
                <img
                  src={Global.url + "user/avatar/" + auth.image}
                  className="profile__avatar"
                  alt="Foto de perfil"
                />
              ) : (
                <img
                  src={Avatar}
                  className="profile__avatar"
                  alt="Foto de perfil"
                />
              )}
            </div>

            <div className="profile__names">
              <Link to={"/social/perfil/" + auth._id} className="profile__name">
                {auth.name}
              </Link>
              <p className="profile__nickname">{auth.nick}</p>
            </div>
          </div>

          <div className="profile__stats">
            <div className="stats">
              <Link
                to={"/social/siguiendo/" + auth._id}
                className="stats__link"
              >
                <span className="stats__title">Siguiendo</span>
                <span className="stats__number">{counters.following}</span>
              </Link>
            </div>
            <div className="stats">
              <Link
                to={"/social/seguidores/" + auth._id}
                className="stats__link"
              >
                <span className="stats__title">Seguidores</span>
                <span className="stats__number">{counters.followed}</span>
              </Link>
            </div>

            <div className="stats">
              <Link to={"/social/perfil/" + auth._id} className="stats__link">
                <span className="stats__title">Publicaciones</span>
                <span className="stats__number">{counters.publications}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="post-form">
          {stored === "stored" && (
            <strong className="alert alert-success">
              Publicado correctamente{" "}
            </strong>
          )}
          {stored === "error" && (
            <strong className="alert alert-danger">
              No se ha podido publicar
            </strong>
          )}
          <form
            id="publication-form"
            className="post-form__form"
            onSubmit={savePublication}
          >
            <div className="post-form__group">
              <label htmlFor="text" className="post-form__label">
                ¿Qué estás pensando hoy?
              </label>
              <textarea
                name="text"
                className="post-form__textarea"
                onChange={changed}
              ></textarea>
            </div>

            <div className="post-form__group">
              <label htmlFor="image" className="post-form__label">
                Sube tu foto
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className="post-form__file"
              />
            </div>

            <input
              type="submit"
              value="Publicar"
              className="post-form__submit"
            />
          </form>
        </div>
      </div>
    </aside>
  );
};
