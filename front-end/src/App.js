import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { LogInPage } from './pages/LogInPage';
import { Navbar } from './components/Navbar';

function AppContent() {
  const location = useLocation();
  // const isLoginPage = location.pathname === "/";

  return (
    <div className="App">
      <div className="root-container">
          {/* {!isLoginPage && <Navbar />}       */}
          <Navbar />
          <div className="page-section">
            <Routes>
              {/* <Route path="/" element={<LogInPage />} /> */}
            </Routes>
          </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
