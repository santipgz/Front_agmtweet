import React from "react";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const { setAuth, setCounters } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();

    setAuth({});
    setCounters({});

    navigate("/login");
  });

  return <h1>Cerrando sesion...</h1>;
};
