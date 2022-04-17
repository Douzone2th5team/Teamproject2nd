import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//사용자 페이
import SignInPage from './signInPage';

function App () {

    return (
        <>
            <Router>
                <Routes>
                    <Route path={"/"} element={<SignInPage/>}/>
                </Routes>
            </Router>
        </>
    )
}
export default App;