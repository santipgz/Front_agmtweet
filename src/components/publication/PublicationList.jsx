import React from "react";
import { Link, useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import Avatar from "../../assets/img/user.png";
import ReactTimeAgo from "react-time-ago";

export const PublicationList = ({
  publications,
  getPublications,
  page,
  setPage,
  more,
  setMore,
}) => {
  const { auth } = useAuth();

  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getPublications(next);
  };
  const deletePublication = async (publicationId) => {
    const request = await fetch(
      Global.url + "publication/remove/" + publicationId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await request.json();
    setPage(1);
    setMore(true);
    getPublications(1, true);
  };
  return (
    <>
      <div className="posts">
        {publications.map((publication) => {
          return (
            <article className="post" key={publication._id}>
              <div className="post__wrapper">
                <div className="post__avatar">
                  <Link
                    to={"/social/perfil/" + publication.user?._id}
                    className="avatar__link"
                  >
                    {publication?.user?.image != "default.png" && (
                      <img
                        src={
                          Global.url + "user/avatar/" + publication?.user?.image
                        }
                        className="avatar__img"
                        alt="Foto de perfil"
                      />
                    )}
                    {publication?.user?.image == "default.png" && (
                      <img
                        src={Avatar}
                        className="avatar__img"
                        alt="Foto de perfil"
                      />
                    )}
                  </Link>
                </div>

                <div className="post__content">
                  <div className="post__header">
                    <a href="#" className="post__username">
                      {publication.user.name} {publication.user.surname}
                    </a>
                    <span className="post__divider"> | </span>
                    <a href="#" className="post__date">
                      <ReactTimeAgo
                        date={publication.created_at}
                        locale="es-ES"
                      ></ReactTimeAgo>
                    </a>
                  </div>

                  <h4 className="post__text">{publication.text}</h4>
                  {publication.file && (
                    <img
                      src={Global.url + "publication/media/" + publication.file}
                      className="post__image"
                      alt="Publicación"
                    />
                  )}
                </div>
              </div>

              {auth._id == publication.user._id && (
                <div className="post__actions">
                  <button
                    onClick={() => deletePublication(publication._id)}
                    className="post__action-btn"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
      {more && (
        <div className="posts__load-more">
          <button className="load-more__btn" onClick={nextPage}>
            Ver más publicaciones
          </button>
        </div>
      )}
    </>
  );
};
