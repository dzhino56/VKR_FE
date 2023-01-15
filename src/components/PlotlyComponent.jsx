import React from 'react';
import Plot from 'react-plotly.js';

const PlotlyComponent = ({plotlyData, revision}) => {
    return (
        <div>
            <Plot
                data={[
                    {
                        z: plotlyData,
                        type: 'heatmap',
                        colorscale: 'Spectral'
                    }
                ]}
                layout={{width: 1000, height: 500, title: 'Traces', datarevision: revision}}
                revision={revision}
                responsive={true}
            />
        </div>
);
};

export default PlotlyComponent;