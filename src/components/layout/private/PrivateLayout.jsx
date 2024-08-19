import React from "react";
import { Header } from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import useAuth from "../../../hooks/useAuth";

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  if (loading) {
    return (
      <div className="spinner-overlay">
        <div className="spinner"></div>
      </div>
    );
  } else {
    return (
      <>
        {/* Cabecera y navegación */}
        <Header></Header>
        <section className="layout__content">
          {auth._id ? <Outlet></Outlet> : <Navigate to="/login/"></Navigate>}
        </section>

        {/* Barra lateral */}
        <Sidebar></Sidebar>
      </>
    );
  }
};
