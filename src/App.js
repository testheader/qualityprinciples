// src/App.js
import './App.css';
import { useState } from "react";
import principles from './resources/principles.json';

function App() {
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
        const CURRENT_URL = "https://qualityprinciples.netlify.app"
        navigator.clipboard.writeText(CURRENT_URL+"?id=" + index)
            .then(() => {
            setShowCopyMessage(true);
            setTimeout(() => setShowCopyMessage(false), 2000);
        });
    }

    const renderPrinciples= () => {
        return principles.principles[index].source.map(principle => (
            <p className="source">{principle}</p>
        ))
    }

    return (
        <div>


            <div className="center-container">
                <div className="principle-container">
                    <h1>{principles.principles[index].title}</h1>
                    <p className="description">{principles.principles[index].description}</p>
                    {renderPrinciples()}
                </div>
            </div>
            <div className="button-container">
                <div className="action button" onClick={handleNextPrinciple}>
                    Next Principle
                </div>
                {!showCopyMessage &&
                <div className="action button" onClick={copyToClipboard}>
                    Share
                </div>}
                {showCopyMessage && <div className="copy-message button">Link copied to clipboard!</div>}
            </div>
        </div>
    );
}

export default App;
