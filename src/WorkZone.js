import React, {useEffect, useState} from "react";
import './styles/App.css'
import PlotlyComponent from "./components/PlotlyComponent";
import Settings from "./components/Settings"
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import FileUploader from "./components/FileUploader";

function WorkZone() {
    const [traces, setTraces] = useState([])
    const [revision, setRevision] = useState(1)
    const [visible, setVisible] = useState(false)

    return (
        <div>
            <FileUploader/>

            <MyButton onClick={() => setVisible(true)}>
                Задать настройки отображения
            </MyButton>
            <MyModal
                visible={visible}
                setVisible={setVisible}
            >
                <Settings
                    setTraces={setTraces}
                    revision={revision}
                    setRevision={setRevision}
                    setVisible={setVisible}
                />
            </MyModal>
            <PlotlyComponent
                plotlyData={traces}
                revision={revision}
            />
        </div>
    );
}

export default WorkZone;