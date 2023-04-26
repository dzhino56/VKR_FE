import SettingsForm from "./SettingsForm";
import SettingsList from "./SettingsList";
import MyButton from "./UI/button/MyButton";
import React, {useState} from 'react';
import axios from "axios";

const Settings = ({setTraces, setTickVals, revision, setRevision, setVisible, settings, setSettings}) => {

    const [sort, setSort] = useState({column: 'TraceNumber', direction: 'ASC'})

    const generateUrl = () => {
        let url = process.env.REACT_APP_BASE_URL + '/api/v1/traces?fileId=' + selectedFile.id
        console.log(settings)
        settings.map(setting => (
            url += '&' + setting.title + '=' + setting.value
        ))
        url += '&sort=' + sort.column + '__' + sort.direction
        console.log(url)
        return url
    }

    async function getData(e) {
        e.preventDefault()
        setVisible(false)
        // const responseShape = await axios.get(process.env.REACT_APP_BASE_URL + '/api/v1/shapes?fileId=' + selectedFile.id)
        // console.log(responseShape.data)
        // const shape = parseInt(responseShape.data)
        // console.log(shape)
        const response = await axios.get(generateUrl())
        const data = response.data["traces"]
        const samples = response.data["samples"]

        // const str = response.data
        //
        // console.log(Array.from(str))
        // const normalArray = [].slice.call(data)
        // while(normalArray.length) result.push(normalArray.splice(0, shape));
        // console.log(result)
        //
        setTraces(data)
        setTickVals(samples)
        console.log(samples)
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