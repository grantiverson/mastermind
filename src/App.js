import React from "react";
import { Provider } from "react-redux";

import store from "./redux";
import Board from "./Pages";

import "./App.scss";
import "./normalize.css";

const App = () => (
    <Provider {...{ store }}>
        <div className="app">
            <Board />
        </div>
    </Provider>
);

export default App;
