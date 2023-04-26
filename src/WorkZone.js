import React, {useState} from "react";
import './styles/App.css'
import PlotlyComponent from "./components/PlotlyComponent";
import Settings from "./components/Settings"
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";

function WorkZone() {
    const [settings, setSettings] = useState([])
    const [traces, setTraces] = useState([])
    const [revision, setRevision] = useState(1)
    const [visible, setVisible] = useState(false)
    const [tickVals, setTickVals] = useState([])

    return (
        <div>
            <MyButton onClick={() => setVisible(true)}>
                Задать настройки отображения
            </MyButton>
            <MyModal
                visible={visible}
                setVisible={setVisible}
            >
                <Settings
                    setTraces={setTraces}
                    setTickVals={setTickVals}
                    revision={revision}
                    setRevision={setRevision}
                    setVisible={setVisible}
                    settings={settings}
                    setSettings={setSettings}
                />
            </MyModal>
            <PlotlyComponent
                plotlyData={traces}
                revision={revision}
                settings={settings}
                tickvals={tickVals}
            />
        </div>
    );
}

export default WorkZone;