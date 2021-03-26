import React, {Component} from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavBar from "./components/AppNavBar";

class App extends Component {
    render() {
        return (
            <div className="App">
                <AppNavBar />
                <h1>Hello</h1>
            </div>
        );
    }
}

export default App;
