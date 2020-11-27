import React from 'react';
import ReactDOM from 'react-dom';

import "./index.css";

const App = () => {
    return (
        <div className="container">
            <div className="row">
                <textarea className="column" />
                <div className="collumn column-left">
                    <fieldset>
                        <legend>Facebook Design</legend>
                        <input type="radio" name="facebook_design" value="old" id="old"/>
                        <label for="old">Old Facebook</label>
                        <br />
                        <input type="radio" name="facebook_design" value="new" id="new"/>
                        <label for="new">New Facebook</label>
                    </fieldset>
                    <button type="button">Export to Word</button>
                </div>
            </div>
        </div>
    )
};

ReactDOM.render(
    <App />,
    document.getElementById('app'),
  );