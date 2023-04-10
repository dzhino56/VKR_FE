import SettingsForm from "./SettingsForm";
import SettingsList from "./SettingsList";
import MyButton from "./UI/button/MyButton";
import React, {useState} from 'react';
import axios from "axios";

const Settings = ({setTraces, revision, setRevision, setVisible}) => {
    const [settings, setSettings] = useState([])
    const [sort, setSort] = useState({column: 'TraceNumber', direction: 'ASC'})

    const generateUrl = () => {
        let url = process.env.REACT_APP_BASE_URL + '/api/v1/traces?'
        console.log(settings)
        settings.map(setting => (
            url += 'fileId=' + selectedFile.id + '&' + setting.title + '=' + setting.value + '&'
        ))
        url += 'sort=' + sort.column + '__' + sort.direction
        console.log(url)
        return url
    }

    async function getData(e) {
        e.preventDefault()
        setVisible(false)
        const response = await axios.get(generateUrl())
        const data = response.data
        setTraces(data)
        setRevision(revision + 1)
    }


    const createSetting = (newSetting) => {
        setSettings([...settings, newSetting])
    }

    const removeSetting = (setting) => {
        setSettings(settings.filter(p => p.id !== setting.id))
    }

    const [selectedFile, setSelectedFile] = useState({id: '', name: ''})

    return (
        <div>
            <SettingsForm
                create={createSetting}
                sort={sort}
                setSort={setSort}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
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