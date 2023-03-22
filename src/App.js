import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Login from "./Login";
import WorkZone from "./WorkZone";
import Register from "./Register";

const App = () => {
    return (
        <div className="wrapper">
            <Router>
                <Routes>
                    <Route exact path="/" element={<WorkZone/>}/>
                    <Route exact path="/register" element={<Register/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
