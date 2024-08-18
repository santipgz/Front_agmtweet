import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'
import Avatar from "../../assets/img/user.png"
import { SerializeForm } from '../../helpers/SerializeForm'


export const Config = () => {

    const [saved, setSaved] = useState("Notsaved")
    const { auth, setAuth } = useAuth()
    const updateUser = async(e) => {
        e.preventDefault()

        let newDataUser= SerializeForm(e.target)

        delete newDataUser.file

        const request = await fetch(Global.url + "user/update",{
            method:"PUT",
            body: JSON.stringify(newDataUser),
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : localStorage.getItem("token")
            }
        })

        const data = await request.json()

        if(data.status == "success" && data.user){
            delete data.user.password
            setAuth(data.user)
            setSaved("Save")
        }else{
            setSaved("Error, not save")
        }

        //Subida de avatar

        const fileInput = document.querySelector("#file")
        
        if(data.status == 'success' && fileInput.files[0]){

            const formDataVirtual = new FormData();
            formDataVirtual.append('file' , fileInput.files[0])

            //Peticion

            const upload = await fetch(Global.url + "user/upload", {
                method:"POST",
                body: formDataVirtual,
                headers:{
                    "Authorization" : localStorage.getItem("token"),
                }
            } )

            const uploadData = await upload.json()

            if(uploadData.status == 'success' && uploadData.user){
                delete uploadData.user.password
                setAuth(uploadData.user)
                setSaved("Save")
            }else{
                setSaved("Error, not save")
            }
        }

    }
    return (
        <>
            <header className="content__header content__header--public">
                <h1 className="content__title">Ajustes</h1>
            </header>
            <div className="content__posts">
                {saved == "Save" ?
                    <strong className="alert alert-success">Usuario actualizado </strong>
                    : ''}
                {saved == "Error, not save" ?
                    <strong className="alert alert-danger">Usuario no actualizado</strong>
                    : ""}
                <form className="register-form" onSubmit={updateUser}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name="name" defaultValue={auth.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Apellidos</label>
                        <input type="text" name="surname" defaultValue={auth.surname} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nick">Nickname</label>
                        <input type="text" name="nick" defaultValue={auth.nick} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="biografia">Biografia</label>
                        <textarea name="biografia" defaultValue={auth.biografia} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo electronico</label>
                        <input type="email" name="email" defaultValue={auth.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="file">Avatar</label>
                        <div className="general-info__container-avatar">
                            {auth.image != "default.png" &&
                                <img
                                    src={Global.url + "user/avatar/" + auth.image}
                                    className="container-avatar__img"
                                    alt="Foto de perfil"
                                />
                            }
                            {auth.image == "default.png" &&
                                <img
                                    src={Avatar}
                                    className="container-avatar__img"
                                    alt="Foto de perfil"
                                />
                            }
                        </div>
                        <br />

                        <input type="file" name="file" id='file' />
                    </div>
                    <br />
                    <input
                        type="submit"
                        value="Actualizar"
                        className="btn btn-success"
                    />
                </form>
            </div>
        </>
    )
}
