import SettingsForm from "./SettingsForm";
import SettingsList from "./SettingsList";
import MyButton from "./UI/button/MyButton";
import React, {useState} from 'react';
import axios from "axios";

const Settings = ({setTraces, revision, setRevision}) => {
    const [settings, setSettings] = useState([])
    const [sort, setSort] = useState({column: 'TraceNumber', direction: 'ASC'})
    const [insResponse, setResponse] = useState({})

    const generateUrl = () => {
        let url = 'http://localhost:8000/traces?'
        console.log(settings)
        settings.map(setting => (
            url += setting.title + '=' + setting.value + '&'
        ))
        url += 'sort=' + sort.column + '__' + sort.direction
        console.log(url)
        return url
    }

    async function getData(e) {
        e.preventDefault()
        const url = generateUrl()
        const response = await axios.get(url)
        const data = response.data
        setResponse(response)
        console.log(data)
        setTraces(data)
        setRevision(revision + 1)
    }


    const createSetting = (newSetting) => {
        setSettings([...settings, newSetting])
    }

    const removeSetting = (setting) => {
        setSettings(settings.filter(p => p.id !== setting.id))
    }

    return (
        <div>
            <SettingsForm
                create={createSetting}
                sort={sort}
                setSort={setSort}
            />
            {settings.length !== 0
                ?
                <div>
                    <form>
                        <SettingsList remove={removeSetting} settings={settings} title={"Список настроек"}/>

                    </form>
                </div>
                :
                <h1 style={{textAlign: "center"}}>
                    Настройки не найдены!
                </h1>
            }
            <MyButton onClick={getData}>Получить данные</MyButton>
        </div>
    );
};

export default Settings;