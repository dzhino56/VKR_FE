import React, {useState} from 'react';
import Plot from 'react-plotly.js';

const PlotlyComponent = ({plotlyData, settings, tickvals, xTickVals, zMaxValue, sorting}) => {

    const [screenWidth, setScreenWidth] = useState(0);
    const [screenHeight, setScreenHeight] = useState(0);
    (function() {
        window.onresize = displayWindowSize;
        window.onload = displayWindowSize;

        function displayWindowSize() {
            let myWidth = window.innerWidth;
            let myHeight = window.innerHeight;
            setScreenHeight(myHeight - 60)
            setScreenWidth(myWidth * 0.7 - 50)
            console.log(arrayRange(0, 4498, 2))
        };


    })();
    function getTitle() {
        let title = ''
        settings.map(setting => (
            title += (setting.title + '=' + setting.value) + ' '
        ))
        return title
    }

    const arrayRange = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
        );

    return (
        <div style={{float: "left", border: '1px solid teal', margin: '20px'}}>
            <Plot
                data={[
                    {
                        x: xTickVals,
                        y: arrayRange(tickvals[0], tickvals[1], tickvals[2]),
                        z: plotlyData,
                        type: 'heatmap',
                        colorscale: [
                            [0, 'rgba(0, 0, 255, 0.9)'],
                            [0.5, 'rgba(255, 255, 255, 0.9)'],
                            [1, 'rgba(255, 0, 0, 0.9)']
                        ],
                        zmax: zMaxValue,
                        zmin: (-1) * zMaxValue,
                        zauto: false,
                    }
                ]}
                layout={{
                    width: screenWidth,
                    height: screenHeight,
                    title: getTitle(),
                    yaxis: {
                        title: "Time (ms)",
                        zeroline: false,
                        range: [tickvals[1], tickvals[0]]

                    },
                    xaxis: {
                        title: sorting.name,
                        tickvals: xTickVals,
                        autotick: true
                    }
                }}

                responsive={true}
            />
        </div>
);
};

export default PlotlyComponent;