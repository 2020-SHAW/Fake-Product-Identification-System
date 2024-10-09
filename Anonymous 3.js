import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScannerPage from './ScannerPage';
import ResultPage from './ResultPage';

const App = () => {
    const [product, setProduct] = useState(null);

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <ScannerPage setProduct={setProduct} />
                </Route>
                <Route path="/result">
                    <ResultPage product={product} />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
