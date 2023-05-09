import React, {useState} from "react";
import './styles/App.css'
import PlotlyComponent from "./components/PlotlyComponent";
import Settings from "./components/Settings"

function WorkZone() {
    const [settings, setSettings] = useState([])
    const [drawingTraces, setDrawingTraces] = useState([])
    const [originalTraces, setOriginalTraces] = useState([])
    const [tickVals, setTickVals] = useState([])
    const [multiplier, setMultiplier] = useState(1)
    const [maxValue, setMaxValue] = useState(0)
    const [xTickVals, setXTickVals] = useState([])
    const [zMaxValue, setZMaxValue] = useState(500)


    const changeMultiplier = (e) => {
        const newMultiplier = e.target.value
        setMultiplier(newMultiplier)
        createDrawingTraces(originalTraces, newMultiplier, maxValue)
    }
    const changeMaxValue = (e) => {
        const newMaxValue = e.target.value
        setMaxValue(newMaxValue)
        if (newMaxValue !== 0) {
            setZMaxValue(newMaxValue)
        } else {
            setZMaxValue(500)
        }
        createDrawingTraces(originalTraces, multiplier, newMaxValue)
    }

    const changeTraces = (traces) => {
        setOriginalTraces(traces)
        createDrawingTraces(traces, multiplier, maxValue)
    }

    const createDrawingTraces = (traces, newMultiplier, newMaxValue) => {
        if (traces.length === 0) {
            console.log("Traces are empty")
            return
        }
        let Xlength = traces.length, Ylength = traces[0].length, newTraces = [];
        for (let i = 0; i < Xlength; i++) {
            newTraces[i] = [];
            for (let j = 0; j < Ylength; j++) {
                let newValue = newMultiplier * traces[i][j];
                if (newMaxValue !== 0) {
                    if (newValue > newMaxValue) {
                        newTraces[i][j] = newMaxValue
                    } else if (newValue < (-1) * newMaxValue) {
                        newTraces[i][j] = (-1) * newMaxValue
                    } else {
                        newTraces[i][j] = newValue
                    }
                } else {
                    newTraces[i][j] = newValue
                }
            }
        }
        setDrawingTraces(newTraces)
    }

    return (
        <div>
            <PlotlyComponent
                plotlyData={drawingTraces}
                settings={settings}
                tickvals={tickVals}
                xTickVals={xTickVals}
                zMaxValue={zMaxValue}
            />
            <Settings
                multiplier={multiplier}
                maxValue={maxValue}
                changeMaxValue={changeMaxValue}
                changeMultiplier={changeMultiplier}
                changeTraces={changeTraces}
                setTickVals={setTickVals}
                setXTickVals={setXTickVals}
                settings={settings}
                setSettings={setSettings}
            />
        </div>
    );
}

export default WorkZone;