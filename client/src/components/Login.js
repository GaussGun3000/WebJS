import { useRef, useState, useEffect, useContext} from "react";

import "../styles/Login.css"
import axios from '../auth/axios'
import AuthContext from "../auth/AuthProvider";

const Login = () =>
{
    const { setAuth } = useContext(AuthContext)
    const userRef = useRef()
    const errorRef = useRef()
    const[user, setUser] = useState('')
    const[pwd, setPwd] = useState('')
    const[errorMsg, setErrorMsg] = useState('')
    const[success, setSuccess] = useState(false)

    useEffect(() => {userRef.current.focus(); }, [])

    useEffect(() => {setErrorMsg('')}, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try
        {
            const response = await axios.post("/auth", JSON.stringify(
                {user, pwd}), {headers: {'Content-Type': 'application/json'}})
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth(user, pwd, roles, accessToken)
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


    return (
        <>
            {success ? (
                <section>
                    <h1>Successful login</h1>
                    <br/>
                    <button onClick={(e) => setSuccess(false)}>Log out</button>
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