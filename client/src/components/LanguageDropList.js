import API from '../API'

const LanguageDropList = () =>
{
    const onChange = () =>
    {
        let localeValue = document.getElementById("languageSelect").value;
    }
    const labelText = "Language: "
    return (<div>
                <label htmlFor="languageSelect" className="languageLabel">{labelText}</label>
                <select className="languageSelect" id="languageSelect" onChange={onChange}>
                    <option value="en">EN</option>
                    <option value="ru">RU</option>
                </select>
            </div>)
}

export default LanguageDropList;