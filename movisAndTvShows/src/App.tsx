import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Details from "./components/Details";
import Home from "./components/Home";
import store from "./store/store";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/details/:id" element={<Details id={""} />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
