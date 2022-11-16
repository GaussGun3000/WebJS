import { useRef, useState, useEffect, useContext} from "react";

import "../styles/Login.css"
import axios from '../auth/axios'
import AuthContext from "../auth/AuthProvider";
import Cookies from 'js-cookie';
import Stats from "./Stats";
import ColorChanger from "./ColorChanger";

const Login = () =>
{
    const { setAuth } = useContext(AuthContext)
    const userRef = useRef()
    const errorRef = useRef()
    const[user, setUser] = useState('')
    const[pwd, setPwd] = useState('')
    const[errorMsg, setErrorMsg] = useState('')
    const[success, setSuccess] = useState(false)
    const[color, setColor] = useState(' #FFFFFF')

    const roles = {1000: 'Admin', 1200: 'User'}

    const loadCookie = () => {
        if (Cookies.get('auth')) {
            let authData = JSON.parse(Cookies.get('auth'))
            setAuth(authData.user, authData.pwd, authData.roles, authData.accessToken)
            setSuccess(true)
        }
        if (Cookies.get('textColor')) setColor(Cookies.get("textColor"))
    }

    const updateStats = () => {
        const date = new Date()
        let rs = parseInt(sessionStorage.getItem("requestsSent")) + 1
        rs && !isNaN(rs) ? sessionStorage.setItem("requestsSent", rs.toString()) : sessionStorage.setItem("requestsSent", "1")
        const lastRequest = (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} 
                                ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
        sessionStorage.setItem("lastRequest", lastRequest)
    }

    useEffect(() => { if (!Cookies.get('auth')) userRef.current.focus(); }, [])

    useEffect(() => {setErrorMsg('')}, [user, pwd])

    useEffect(() => {loadCookie()})

    useEffect(() => {setColor(Cookies.get("textColor"))}, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try
        {
            updateStats()
            const response = await axios.post("/auth", JSON.stringify(
                {user, pwd}), { headers: {'Content-Type': 'application/json'}})
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth(user, pwd, roles, accessToken)
            Cookies.set('auth', JSON.stringify({user: user, pwd: pwd, roles: roles, accessToken: accessToken}), { expires: 365 })
            setUser('')
            setPwd('')
            setSuccess(true)
        } catch (err)
        {
            if (!err?.response) { setErrorMsg('Server not responding') }
            else if (err.response?.status === 400) {setErrorMsg('Username or Password is missing')}
            else if (err.response?.status === 401) {setErrorMsg('Wrong username or password')}
            else { setErrorMsg("Unknown error()")}
            errorRef.current.focus()
        }
    }

    const logout = (e) => {
        e.preventDefault()
        Cookies.remove('auth')
        setSuccess(false)
    }

    return (
        <>
            {success ? (
                <section>
                    <ColorChanger/>
                    <h1 style={{color: `${color}`}}>Welcome, {roles[JSON.parse(Cookies.get('auth')).roles[0]]}</h1>
                    <br/>
                    <Stats textColor={color}/>
                        <></>
                    <button onClick={(e) => {setColor(Cookies.get('color'))}}>Update color</button>
                    <button className="logOut-button" onClick={logout}>Log out</button>
                </section>
             ) : (
                <section>
                    <p ref={errorRef} className={errorMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" ref={userRef} autoComplete="off"
                               onChange={(e) => setUser(e.target.value)} value={user} required/>

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={(e) => setPwd(e.target.value)}
                               value={pwd} required/>
                        <button>Sign In</button>
                    </form>
                </section> )}
        </>
    )
}

export default Login