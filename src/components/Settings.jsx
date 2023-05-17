import SettingsForm from "./SettingsForm";
import MyButton from "./UI/button/MyButton";
import React, {useState} from 'react';
import axios from "axios";
import MyInput from "./UI/input/MyInput";

const Settings = ({multiplier, maxValue, changeMultiplier, changeMaxValue, changeTraces, setTickVals, settings, setSettings, setXTickVals}) => {

    const [sort, setSort] = useState({column: 'TraceNumber', direction: 'ASC'})
    const [selectedFile, setSelectedFile] = useState({id: '', name: ''})

    const generateUrl = () => {
        let url = process.env.REACT_APP_BASE_URL + '/api/v1/traces?fileId=' + selectedFile.id
        settings.map(setting => (
            url += '&' + setting.title + '=' + setting.value
        ))
        url += '&sort=' + sort.column + '__' + sort.direction
        console.log(url)
        return url
    }

    async function getData(e) {
        e.preventDefault()
        const response = await axios.get(generateUrl())
        changeTraces(response.data["traces"])
        setTickVals(response.data["samples"])
        setXTickVals(response.data["sorting"])
    }

    return (
        <div style={{float: "right"}}>
            <SettingsForm
                settings={settings}
                setSettings={setSettings}
                sort={sort}
                setSort={setSort}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
            />
            <label>Gain</label>
            <MyInput
                type={"number"}
                value={multiplier}
                onChange={changeMultiplier}
            />
            <label>Clipping</label>
            <MyInput
                type={"number"}
                value={maxValue}
                onChange={changeMaxValue}
            />
            <MyButton onClick={getData}>Получить данные</MyButton>
        </div>
    );
};

export default Settings;