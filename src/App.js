import React, {useState} from "react";
import './styles/App.css'
import SettingsForm from "./components/SettingsForm";
import SettingsList from "./components/SettingsList";
import MyButton from "./components/UI/button/MyButton";
import axios from "axios";

function App() {
    const [sort, setSort] = useState({column: 'TraceNumber', direction: 'ASC'})
    const [settings, setSettings] = useState([])

    const createSetting = (newSetting) => {
        setSettings([...settings, newSetting])
    }

    const removeSetting = (setting) => {
        setSettings(settings.filter(p => p.id !== setting.id))
    }

    const generateUrl = () => {
        let url = 'http://localhost:8000/traces?'
        console.log(settings)
        settings.map(setting => (
            url += setting.title + '=' + setting.value + '&'
        ))
        url += 'sort=' + sort.column + '_' + sort.direction
        console.log(url)
        return url
    }

    async function getData(e) {
        e.preventDefault()
        const url = generateUrl()
        const response = await axios.get(url)
        console.log(response)
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
                        <MyButton onClick={getData}>Получить данные</MyButton>
                    </form>
                </div>
                :
                <h1 style={{textAlign: "center"}}>
                    Настройки не найдены!
                </h1>
            }
        </div>
    );
}

export default App;
