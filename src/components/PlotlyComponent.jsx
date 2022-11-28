import React from 'react';
import Plot from 'react-plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory'

const PlotlyComponent = (props) => {
    return (
        <div>
            <Plot/>
        </div>
    );
};

export default PlotlyComponent;