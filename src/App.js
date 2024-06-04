// src/App.js
import './App.css';
import Home from "./Home";
import Overview from "./Overview";

import {Route, Routes} from "react-router-dom";
import {useState} from "react";

function App() {
    const [overviewActive, setOverviewActive] = useState(false);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home isOverviewActive={overviewActive} />}/>
                <Route path="/overview" element={<Overview />} />
            </Routes>
            <footer >
                <p onClick={() => setOverviewActive(!overviewActive)}>By Geert van de Lisdonk</p>
                <p><a href="https://www.linkedin.com/in/geert-van-de-lisdonk-25057049">LinkedIn</a></p>
                <p><a href="twitter.com/vdlgeert">twitter</a></p>
            </footer>
        </div>
    );
}

export default App;
