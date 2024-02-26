
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/login'
import Home from './components/home';
import Deposit from './components/deposit';
import Transfer from './components/transfer';
import Withdraw from './components/withdraw';
import Success from './components/success';

function App() {
  return (
    <>
      <Router>
        <Routes>

          {/* login */}
          <Route
            exact
            path='/'
            element={<Login/>}
          />

          {/* home */}
          <Route
            path='/home'
            element={<Home />}
          />

          {/* deposit*/}
          <Route
            path='/deposit'
            element={<Deposit/>}
          />
          {/* transfer*/}
          <Route
            path='/transfer'
            element={<Transfer/>}
          />
          {/* withdraw*/}
          <Route
            path='/withdraw'
            element={<Withdraw/>}
          />
          {/* success*/}
          <Route
            path='/success'
            element={<Success/>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
