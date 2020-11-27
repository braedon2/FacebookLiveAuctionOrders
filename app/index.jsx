import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import "./index.css";

const App = () => {
    const [textAreaValue, setTextAreaValue] = useState("");

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
                        <label for="old">Old Facebook</label>
                        <br />
                        <input type="radio" name="facebook_design" value="new" id="new"/>
                        <label for="new">New Facebook</label>
                    </fieldset>
                    <button type="button" disabled={textAreaValue === ""}>Export to Word</button>
                </div>
            </div>
        </div>
    )
};

ReactDOM.render(
    <App />,
    document.getElementById('app'),
  );