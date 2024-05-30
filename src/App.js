// src/App.js
import './App.css';
import { useState } from "react";
import principles from './resources/principles.json';
import {isMobile} from 'react-device-detect';

function App() {
    const CURRENT_URL = "https://qualityprinciples.netlify.app"

    const getUrlWithIndex = () => {
        return CURRENT_URL+"?id=" + index
    }

    const getInitialIndexFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        let id = parseInt(params.get('id'), 10);
        let numberOfPrinciples = principles.principles.length

        if(id>numberOfPrinciples || !id){
            id = Math.floor(Math.random() * principles.principles.length);
        }

        return id;
    };

    const [index, setIndex] = useState(getInitialIndexFromUrl());
    const [showCopyMessage, setShowCopyMessage] = useState(false);

    const handleNextPrinciple = () => {
        const newIndex = principles.principles.length-1===index? 0 : index+1;
        setIndex(newIndex);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(getUrlWithIndex())
            .then(() => {
            setShowCopyMessage(true);
            setTimeout(() => setShowCopyMessage(false), 2000);
        });
    }

    const renderPrinciples= () => {
        return principles.principles[index].source.map(principle => (
            <p className={isMobile?"":"source"}>{principle}</p>
        ))
    }

    const buildTweet = () => {
        let result = new URL("/intent/tweet", "https://x.com")
        result.searchParams.append("text", principles.principles[index].title + "\n")
        result.searchParams.append("url", getUrlWithIndex())
        result.searchParams.append("via", "vdlgeert")
        result.searchParams.append("hashtags", "qualityPrinciples")

        return result.toString()
    };

    const buildLinkedIn = () => {
        let result = new URL("share", "https://linkedin.com")
        let text =
            "Found this at " + getUrlWithIndex() + "\n" +
            principles.principles[index].title + "\n\n" +
            principles.principles[index].description + "\n\n" +
            "sources:" + principles.principles[index].source.map(a => " " + a) + "\n"

        result.searchParams.append("text", text)
        result.searchParams.append("url", getUrlWithIndex())

        return result.toString()
    }

    return (
        <div>
            <div className={isMobile?"":"center-container"}>
                <div className={isMobile?"":"principle-container"}>
                    <h1>{isMobile?"MOBILE":principles.principles[index].title}</h1>
                    <p className={isMobile?"":"description"}>{principles.principles[index].description}</p>
                    {renderPrinciples()}
                </div>
            </div>
            <div className={isMobile?"":"button-container"}>
                <div className={isMobile?"":"button action"} onClick={handleNextPrinciple}>
                    Next Principle
                </div>
                <div className={isMobile?"":"spacer"}>Share this principle make the world a better place:</div>
                {!showCopyMessage &&
                    <div className={isMobile?"":"button action"} onClick={copyToClipboard}>
                        Copy URL
                    </div>}
                {showCopyMessage && <div className={isMobile?"":"copy-message button"}>Link copied to clipboard!</div>}
                <div className={isMobile?"":"share-container"}>
                    <a className={isMobile?"":"button social"} href={buildTweet()} target="_blank" rel="noreferrer">Tweet</a>
                    <a className={isMobile?"":"button social"} href={buildLinkedIn()} target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
            </div>
        </div>
    );
}

export default App;
