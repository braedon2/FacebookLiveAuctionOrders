import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from 'file-saver';

import "./index.css";

const App = () => {
    const [textAreaValue, setTextAreaValue] = useState("");

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
            saveAs(blob);
        })
    };

    return (
        <div className="container">
            <div className="row">
                <textarea 
                    className="column" 
                    onChange={(e) => setTextAreaValue(e.target.value)} 
                    value={textAreaValue}
                />
                <div className="collumn column-left">
                    <fieldset>
                        <legend>Facebook Design</legend>
                        <input type="radio" name="facebook_design" value="old" id="old"/>
                        <label htmlFor="old">Old Facebook</label>
                        <br />
                        <input type="radio" name="facebook_design" value="new" id="new"/>
                        <label htmlFor="new">New Facebook</label>
                    </fieldset>
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