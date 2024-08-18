import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'

export const Login = () => {
  const {form,changed} = useForm({})
  const [saved, setSaved] = useState("")
  const {setAuth} = useAuth()

  const loginUser = async(e) =>{
    e.preventDefault();
    console.log(form)
    let userToLogin = form;

    //Peticion user en el backend

     try {
      const request = await fetch(Global.url + "user/login", {
        method: "POST",
        body: JSON.stringify(userToLogin),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await request.json();
      if (data.status === "success") {
        localStorage.setItem("token",data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        setSaved("login");

        //  Seat datos en auth
        setAuth(data.user)

        //Redirección

        setTimeout(() => {
          window.location.reload()
        },1000)


      } else {
        setSaved("error");
      }
      console.log(data)

    } catch (error) {
      setSaved("error");
      console.error("An error occurred:", error);
    }
  }
  return (
    <>
    <header className="content__header content__header--public">
      <h1 className="content__title">Login</h1>
    </header>
    <div className="content__posts">
    {saved == "login" ?
          <strong className="alert alert-success">Usuario identificado correctamente </strong>
          : ''}
        {saved == "error" ?
          <strong className="alert alert-danger">Usuario o contraseña incorrectos</strong>
          : ""}
      <form className='form-login' onSubmit={loginUser}>
        <div className='form-group'>
          <input type="text" name="email" placeholder='Correo Electronico' onChange={changed} />
          <input type="text" name="password" placeholder='password' onChange={changed} />
          <input type="submit" value="Entrar" />
        </div>
      </form>
    </div>
  </>
  )
}
