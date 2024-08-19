import React from "react";
import Avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

export const UserList = ({
  users,
  getUsers,
  following,
  setFollowing,
  page,
  setPage,
  more,
  setMore,
}) => {
  const { auth } = useAuth();
  console.log(users);
  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getUsers(next);
    console.log(page, users, following);
  };
  const follow = async (userID) => {
    //Peticion al backend para guardar el follow

    const request = await fetch(Global.url + "follow/save", {
      method: "POST",
      body: JSON.stringify({ followed: userID }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const dataFollow = await request.json();
    // Cuando este todo ok
    if (dataFollow.status == "success") {
      setFollowing([...following, userID]);
    }
    // Actualizando estando de following
  };

  const unfollow = async (userID) => {
    //Peticion al backend para borrar el follow
    const request = await fetch(Global.url + "follow/unfollow/" + userID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    // Cuando este todo ok
    const dataUnfollow = await request.json();

    // Actualizando estando de following
    //filtrando los datos para eliminar el antiguo userId que acabo de dejar de seguir
    if (dataUnfollow.status == "success") {
      let filterFollowing = following.filter(
        (followingUserId) => userID != followingUserId
      );
      setFollowing(filterFollowing);
    }
  };
  return (
    <>
      {" "}
      <div className="users">
        {users
          ? users.map((user) => {
              return (
                <article key={user._id} className="user-card">
                  <div className="user-card__container">
                    <div className="user-card__avatar">
                      <Link
                        to={"/social/perfil/" + user._id}
                        className="avatar__link"
                      >
                        {user.image !== "default.png" ? (
                          <img
                            src={Global.url + "user/avatar/" + user.image}
                            className="avatar__img"
                            alt="Foto de perfil"
                          />
                        ) : (
                          <img
                            src={Avatar}
                            className="avatar__img"
                            alt="Foto de perfil"
                          />
                        )}
                      </Link>
                    </div>

                    <div className="user-card__info">
                      <div className="user-card__header">
                        <Link
                          to={"/social/perfil/" + user._id}
                          className="user-card__name"
                        >
                          {user.name} {user.surname}
                        </Link>
                        <span className="user-card__divider"> | </span>
                        <Link
                          to={"/social/perfil/" + user._id}
                          className="user-card__date"
                        >
                          Activo desde{" "}
                          <ReactTimeAgo date={user.created_at} locale="es-ES" />
                        </Link>
                      </div>

                      <p className="user-card__bio">{user.biografia}</p>
                    </div>
                  </div>

                  {user._id !== auth._id && (
                    <div className="user-card__actions">
                      {!following.includes(user._id) ? (
                        <button
                          className="user-card__button user-card__button--follow"
                          onClick={() => follow(user._id)}
                        >
                          Seguir
                        </button>
                      ) : (
                        <button
                          className="user-card__button user-card__button--unfollow"
                          onClick={() => unfollow(user._id)}
                        >
                          Dejar de seguir
                        </button>
                      )}
                    </div>
                  )}
                </article>
              );
            })
          : ""}
      </div>
      {more && (
        <div className="users__load-more">
          <button className="load-more__btn" onClick={nextPage}>
            Ver más personas
          </button>
        </div>
      )}
    </>
  );
};
