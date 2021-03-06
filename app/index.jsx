import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from 'file-saver';

import { parseOrders, parseProfileLinks } from "./utils/parse";
import generateOrdersDoc from "./utils/generate";

import "./index.css";

const Card = ({ className, children }) => {
    return (
        <div className={"card" + " " + className}>
            {children}
        </div>
    )
};

const TitleSection = () => {
    return (
        <div className="title-section-container">
            <h1 className="title">
                Generate Orders from Facebook Comments
            </h1>
            <a 
                href="https://github.com/braedon2/FacebookLiveAuctionOrders" 
                target="_blank" 
                rel="noopener noreferrer" >
                Click here for instructions
            </a>
        </div>
    );
};

const PasteSection = ({ onPaste, onClearClick, value, onChange }) => {
    return (
        <React.Fragment>
            <h1 className="hd-large">Paste Comment Section</h1>
            <textarea 
                className="text-input" 
                onChange={onChange} 
                onPaste={onPaste}
                value={value}
            />
            <button 
                className="btn"
                onClick={onClearClick} >
                Clear
            </button>
        </React.Fragment>
    )
};

const ExportSection = ({ onExportClick, disabled, error }) => {
    const [filename, setFilename] = useState("");
    const [design, setDesign] = useState("old");

    return (
        <React.Fragment>
            <h1 className="hd-large">Export to Word Document</h1>
            <div className="inputs-container">
                <h2 className="hd-small">Facebook Design</h2>
                <input 
                    type="radio" 
                    name="facebook_design" 
                    value="old" 
                    id="old" 
                    onClick={(e) => setDesign(e.target.value)}
                    defaultChecked
                />
                <label htmlFor="old">Old Facebook</label>
                <br />
                <input 
                    type="radio" 
                    name="facebook_design" 
                    value="new" 
                    id="new"
                    onClick={(e) => setDesign(e.target.value)}
                />
                <label htmlFor="new">New Facebook</label>
                <br />
            </div>
            <div className="inputs-container">
                <label htmlFor="filename">Filename</label>
                <input 
                    className="filename-input text-input" 
                    type="text" 
                    id="filename" 
                    placeholder={"e.g Orders-Nov23"}
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)} 
                />
            </div>
            <button 
                className="btn"
                type="button" 
                disabled={disabled}
                onClick={() => onExportClick(design, filename)} >
                Export to Word
            </button>
            {error && <p className="error">{error}</p>}
        </React.Fragment>
    )
};

const App = () => {
    const [textAreaValue, setTextAreaValue] = useState("");
    const [textAreaValueHtml, setTextAreaValueHtml] = useState("");
    const [error, setError] = useState(null);

    const handleExportClick = (design, filename) => {
        try {
            const orders = parseOrders(textAreaValue, design);
            const profileLinks = parseProfileLinks(textAreaValueHtml, Object.keys(orders));
            const doc = generateOrdersDoc(orders, profileLinks);

            // some poor naming here but I don't feel like changing it
            if (orders.warning) {
                setError(orders.warning);
            }

            Packer.toBlob(doc).then((blob) => {
                saveAs(blob, filename);
            })
        }
        catch (error) {
            console.error(error);
            setError("There was an error creating the word document")
        }
    };

    const handleClearClick = () => {
        setTextAreaValue("");
        setTextAreaValueHtml("");
        setError(null);
    }

    const handlePaste = (e) => {
        setTextAreaValueHtml(e.clipboardData.getData("text/html"));
    }

    return (
        <div className="container">
            <TitleSection />
            <div className="row">
                <Card className="column">
                    <PasteSection 
                        value={textAreaValue}
                        onChange={(e) => setTextAreaValue(e.target.value)}
                        onPaste={handlePaste} 
                        onClearClick={handleClearClick} 
                    />
                </Card>
                <Card className="column">
                    <ExportSection 
                        onExportClick={handleExportClick} 
                        disabled={textAreaValue === ""} 
                        error={error} />
                </Card>
            </div>
        </div>
    )
};

ReactDOM.render(
    <App />,
    document.getElementById('app'),
  );