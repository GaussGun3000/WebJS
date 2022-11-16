import {useState,   useEffect} from "react";
import Cookies from 'js-cookie';

const ColorChanger = () =>
{
    const [color, setColor] = useState( '#FFFFFF')

    const onColorChange = (e) =>
    {
        setColor(e.target.value)
        Cookies.set('textColor', color, { expires: 365 })
    }
    useEffect(() => { if (Cookies.get("textColor")) setColor(Cookies.get("textColor"))}, [])

    return (
        <>
            <label htmlFor="colorInput">Color</label>
            <input id="colorInput" type="color" value={color} onChange={onColorChange}/>
        </>
    )
}
export default ColorChanger

