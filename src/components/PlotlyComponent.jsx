import React, {useState} from 'react';
import Plot from 'react-plotly.js';

const PlotlyComponent = ({plotlyData, revision}) => {

    const [screenWidth, setScreenWidth] = useState(0);
    const [screenHeight, setScreenHeight] = useState(0);
    (function() {
        window.onresize = displayWindowSize;
        window.onload = displayWindowSize;

        function displayWindowSize() {
            let myWidth = window.innerWidth;
            let myHeight = window.innerHeight;
            setScreenHeight(myHeight - 60)
            setScreenWidth(myWidth - 60)
        };


    })();
    return (
        <div>
            <Plot
                data={[
                    {
                        z: plotlyData,
                        type: 'heatmap',
                        colorscale: 'Picnic'
                    }
                ]}
                layout={{
                    width: screenWidth,
                    height: screenHeight,
                    title: 'Traces',
                    yaxis: {title: "hello", autorange: "reversed"},
                    xaxis: {title: "hello"}
                }}
                responsive={true}
            />
        </div>
);
};

export default PlotlyComponent;