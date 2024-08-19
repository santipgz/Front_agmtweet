import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { UserList } from "./UserList";

export const Gente = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState();
  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (next = 1) => {
    //Peticion para sacar usuarios

    const request = await fetch(Global.url + "user/list/" + next, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const dataUsers = await request.json();
    if (dataUsers.users && dataUsers.status == "success") {
      let newUsers = dataUsers.users;
      if (users.length >= 1) {
        newUsers = [...users, ...dataUsers.users];
      }
      setUsers(newUsers);
      setFollowing(dataUsers.user_following);
      console.log(dataUsers);

      if (users.length >= dataUsers.total - dataUsers.itemsPerPage) {
        setMore(false);
      }
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">GENTE</h1>
        <button className="content__button">Mostrar nuevas</button>
      </header>

      <UserList
        users={users}
        getUsers={getUsers}
        following={following}
        setFollowing={setFollowing}
        page={page}
        setPage={setPage}
        more={more}
        setMore={setMore}
      ></UserList>
    </>
  );
};
