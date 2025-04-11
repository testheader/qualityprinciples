// src/App.js
import './App.css';
import Home from './components/Home';
import Overview from './components/Overview'
import FirstTimeModal from './components/FirstTimeModal';

import {Route, Routes} from "react-router-dom";
import {useState} from "react";
import HeaderBar from "./components/HeaderBar";
import principles from "./resources/principles.json";
import {ChevronLeftIcon, ChevronRightIcon} from "./resources/Icons";
import {Helmet} from "react-helmet";

function App() {
    const [overviewActive, setOverviewActive] = useState(false);
    const [principleIndex, setPrincipleIndex] = useState(() => {
        let id = Math.abs(parseInt(new URLSearchParams(window.location.search).get('id'), 10));
        if (id > principles.principles.length - 1 || isNaN(id)) {
            id = Math.floor(Math.random() * principles.principles.length);
        }
        return id;
    });

    const currentPrinciple = {
        title: principles.principles[principleIndex].title,
        description: principles.principles[principleIndex].description,
        url: `${window.location.origin}?id=${principleIndex}`,
        source: principles.principles[principleIndex].source,
    }

    return (
        <div>

            <Helmet>
                <meta name="robots" content="max-image-preview:large"/>

                <meta name="twitter:card" content="summary_large"/>
                <meta name="description" content={currentPrinciple.description}/>
                <meta name="twitter:site" content="@vdlgeert"/>
                <meta name="twitter:creator" content="@vdlgeert"/>
                <name name="twitter:title" property="twitter:title" content={currentPrinciple.title}/>
                <meta name="author" content="Geert van de Lisdonk"/>

                <meta name="type" property="og:type" content="website"/>
                <meta name="url" property="og:url" content={currentPrinciple.url}/>
                <meta name="title" property="og:title" content={currentPrinciple.title}/>
                <meta property="og:description" content={currentPrinciple.description}/>
                <meta name="site_name" property="og:site_name" content="Quality Principles"/>
            </Helmet>

            <FirstTimeModal />
            <HeaderBar principle={currentPrinciple}/>
            <Routes>
                <Route path="/" element={
                    <div>
                        <Home currentPrinciple={currentPrinciple}/>
                        <div className={`principleNavigation`} >
                            <div className={`navigationButton`} role="button" onClick={() => {
                                document.getElementById('principle-container').className = 'principle-container animate';
                                setTimeout(() => {
                                    setPrincipleIndex((principles.principles.length + (principleIndex - 1)) % principles.principles.length);
                                    document.getElementById('principle-container').className = 'principle-container';
                                }, 600);
                            }}>
                                <ChevronLeftIcon/>previous
                            </div>
                            <div className={`navigationButton`} role="button" onClick={() => {
                                document.getElementById('principle-container').className = 'principle-container animate';
                                setTimeout(() => {
                                    setPrincipleIndex((principleIndex + 1) % principles.principles.length);
                                    document.getElementById('principle-container').className = 'principle-container';
                                }, 600);
                            }}>
                                next
                                <ChevronRightIcon/>
                            </div>
                        </div>
                    </div>
                }/>
                <Route path="/overview" element={<Overview/>}/>
            </Routes>
            <footer data-testid={"footerComponent"}>
                <p onClick={() => setOverviewActive(!overviewActive)} data-testid={"showOverview"}>By Geert van de
                    Lisdonk</p>
                <p><a href="https://www.linkedin.com/in/geert-van-de-lisdonk-25057049">LinkedIn</a></p>
                <p><a href="twitter.com/vdlgeert">twitter</a></p>
            </footer>
        </div>
    );
}

export default App;
