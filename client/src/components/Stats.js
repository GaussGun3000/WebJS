import {useState,   useEffect} from "react";
import Cookies from 'js-cookie';
import API from "../API";


const Stats = ({textColor}) =>
{
    const [color, setColor] = useState(textColor)
    const [requestsSent, setRequestsSent] = useState('')
    const [lastRequest, setLastRequest] = useState('')

    useEffect(() => { if (Cookies.get("textColor")) setColor(Cookies.get("textColor"))}, [textColor])
    useEffect(() => { refresh(null)} , [])

    const refresh = async (e) =>
    {
        let promise = new API().stats()
        let rs = parseInt(sessionStorage.getItem("requestsSent")) + 1
        rs && !isNaN(rs) ? sessionStorage.setItem("requestsSent", rs.toString()) : sessionStorage.setItem("requestsSent", "1")
        const date = new Date()
        const lastRequest = (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} 
                                ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
        sessionStorage.setItem("requestSent", rs.toString())
        sessionStorage.setItem("lastRequest", lastRequest)
        setLastRequest(lastRequest)
        setRequestsSent(rs.toString())
    }

    return (
        <>
            <p style={{color: `${color}`}}>Total requests: {requestsSent}</p>
            <p style={{color: `${color}`}}>Last request was at {lastRequest}</p>
            <button onClick={refresh}>Refresh</button>
        </>
    )
}
export default Stats

