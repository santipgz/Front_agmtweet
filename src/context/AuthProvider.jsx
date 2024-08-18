import React, { useState, useEffect, createContext } from 'react'
import { Global } from '../helpers/Global'

const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const [counters, setCounters] = useState({})
    const [loading, setLoading] = useState(true)

    //Se ejecuta 1veznlaprimera
    useEffect(() => {
        authUser()
    }, [])
    const authUser = async () => {
        //Sacar datos de usuario identificado
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")
        // Comprobar si tengo el token yeluser

        if (!token || !user) {
            setLoading(false)
            return false
        }

        // Trasformnar datos a objt js

        const userObj = JSON.parse(user)
        const userId = userObj.id

        //Que me devuelva todoslos datos user

        const request = await fetch(Global.url + 'user/profile/' + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const data = await request.json()

        //Peticion para contadores de follows,followers,etc

        const requestCounters = await fetch(Global.url + 'user/counters/' + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        const dataCounters = await requestCounters.json()


        // Setear elestado de auth

        setAuth(data.user)
        setCounters(dataCounters)
        setLoading(false)
    }
    return (<AuthContext.Provider
        value={{
            auth,
            setAuth,
            counters,
            setCounters,
            loading
        }}
    >
        {children}
    </AuthContext.Provider>

    )
}

export default AuthContext
