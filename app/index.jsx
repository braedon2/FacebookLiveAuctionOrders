import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from 'file-saver';

import "./index.css";

const App = () => {
    const [textAreaValue, setTextAreaValue] = useState("");
    const [textAreaValueHtml, setTextAreaValueHtml] = useState("");
    const [filename, setFilename] = useState("");

    const handleExportClick = () => {
        const doc = new Document();

        doc.addSection({
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun("Hello Worlddd\n"),
                        new TextRun({
                            text: "Foo Bar\n",
                            bold: true,
                        }),
                        new TextRun({
                            text: "\tGithub is the best",
                            bold: true,
                        }),
                    ],
                }),
            ],
        });

        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, filename);
        })
    };

    const handlePaste = (e) => {
        setTextAreaValueHtml(e.clipboardData.getData("text/html"));
    }

    console.log(textAreaValueHtml);

    return (
        <div className="container">
            <div className="row">
                <textarea 
                    className="column" 
                    onChange={(e) => setTextAreaValue(e.target.value)} 
                    onPaste={handlePaste}
                    value={textAreaValue}
                />
                <div className="collumn column-left">
                    <fieldset>
                        <legend>Facebook Design</legend>
                        <input type="radio" name="facebook_design" value="old" id="old" defaultChecked/>
                        <label htmlFor="old">Old Facebook</label>
                        <br />
                        <input type="radio" name="facebook_design" value="new" id="new"/>
                        <label htmlFor="new">New Facebook</label>
                    </fieldset>
                    <label htmlFor="filename">Filename</label>
                    <input 
                        className="filename-input" 
                        type="text" 
                        id="filename" 
                        placeholder={"e.g Orders-Nov23"}
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)} 
                    />
                    <button 
                        type="button" 
                        disabled={textAreaValue === ""}
                        onClick={handleExportClick}>
                        Export to Word
                    </button>
                </div>
            </div>
        </div>
    )
};

ReactDOM.render(
    <App />,
    document.getElementById('app'),
  );