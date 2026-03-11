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
    const [principleIndex, setPrincipleIndex] = useState(() => {
        const urlId = new URLSearchParams(window.location.search).get('id');
        const foundIndex = principles.principles.findIndex(p => p.id === urlId);
        if (foundIndex !== -1) {
            return foundIndex;
        }
        return Math.floor(Math.random() * principles.principles.length);
    });

    const currentPrinciple = {
        id: principles.principles[principleIndex].id,
        title: principles.principles[principleIndex].title,
        description: principles.principles[principleIndex].description,
        url: `${window.location.origin}?id=${principles.principles[principleIndex].id}`,
        source: principles.principles[principleIndex].source,
    }

    return (
        <div>

            <Helmet>
                <meta name="robots" content="max-image-preview:large"/>

                <meta name="description" content={currentPrinciple.description}/>
                <meta name="author" content="Geert van de Lisdonk"/>

                <meta name="type" property="og:type" content="website"/>
                <meta name="url" property="og:url" content={currentPrinciple.url}/>
                <meta name="title" property="og:title" content={currentPrinciple.title}/>
                <meta property="og:description" content={currentPrinciple.description}/>
                <meta property="og:image" content={`https://qualityprinciples.netlify.app/og-images/${currentPrinciple.id}.png`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
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
                <p data-testid={"showOverview"}>By Geert van de
                    Lisdonk</p>
                <p><a href="https://www.linkedin.com/in/geert-van-de-lisdonk-25057049">LinkedIn</a></p>
            </footer>
        </div>
    );
}

export default App;
