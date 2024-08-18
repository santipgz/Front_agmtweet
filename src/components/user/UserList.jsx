import React from "react";
import Avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago"


export const UserList = ({ users, getUsers, following, setFollowing, page, setPage, more, setMore}) => {
  const { auth } = useAuth();
  console.log(users)
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
      <div className="content__posts">
        {users
          ? users.map((user) => {
              return (
                <article key={user._id} className="posts__post">
                  <div className="post__container">
                    <div className="post__image-user">
                      <Link to={"/social/perfil/" + user._id} className="post__image-link">

                         {user.image != "default.png" && (
                          <img
                            src={Global.url + "user/avatar/" + user.image}
                            className="post__user-image"
                            alt="Foto de perfil"
                          />
                        )}
                        {user.image == "default.png" && (
                          <img
                            src={Avatar}
                            className="post__user-image"
                            alt="Foto de perfil"
                          />
                        )} 
                      </Link>
                    </div>

                    <div className="post__body">
                      <div className="post__user-info">
                        <Link to={"/social/perfil/" + user._id} className="user-info__name">
                          {user.name} {user.surname}
                        </Link>
                        <span className="user-info__divider"> | </span>
                        <Link to={"/social/perfil/" + user._id} className="user-info__create-date">
                          agmtwetter desde {" "} 
                          <ReactTimeAgo date={user.created_at} locale="es-ES"></ReactTimeAgo>

                        </Link>
                      </div>

                      <h4 className="post__content">{user.biografia}</h4>
                    </div>
                  </div>
                  {/* Solo mostrar botones seguir/no seguir cuando el usuario no sea el identificaado */}
                  {user._id != auth._id && (
                    <div className="post__buttons">
                      {!following.includes(user._id) && (
                        <button
                          className="post__button post__button--green"
                          onClick={() => follow(user._id)}
                        >
                          Seguir
                        </button>
                      )}
                      {following.includes(user._id) && (
                        <button
                          className="post__button"
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
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            Ver mas personas
          </button>
        </div>
      )}
    </>
  );
};
