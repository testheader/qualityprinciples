// src/App.js
import './App.css';
import Home from './components/Home';
import Overview from './components/Overview'
import FirstTimeModal from './components/FirstTimeModal';

import {Route, Routes} from "react-router-dom";
import {useState} from "react";
import Cookies from 'js-cookie';

function App() {
    const [overviewActive, setOverviewActive] = useState(false);

    const isFirstTime = () => {
        console.log(Cookies.get("isFirstTime")??true)
        return Cookies.get("isFirstTime")??true
    }

    return (
        <div>
            <FirstTimeModal isFirstTimeProp={isFirstTime()}/>
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
