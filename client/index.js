import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import 'regenerator-runtime/runtime'

// uncomment so that webpack can bundle styles
import styles from "./css/application.css";

render(<App />, document.getElementById("root"));
