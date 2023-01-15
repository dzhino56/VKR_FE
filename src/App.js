import React, {useState} from "react";
import './styles/App.css'
import PlotlyComponent from "./components/PlotlyComponent";
import Settings from "./components/Settings"

function App() {
    const [traces, setTraces] = useState([])
    const [revision, setRevision] = useState(1)

    return (
        <div>
            <Settings
                setTraces={setTraces}
                revision={revision}
                setRevision={setRevision}
            />
            <PlotlyComponent
                plotlyData={traces}
                revision={revision}
            />
        </div>
    );
}

export default App;
