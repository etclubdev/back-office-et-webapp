import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { LogInPage } from './pages/LogInPage';
import { Navbar } from './components/Navbar';
import { FormPage } from './pages/ManagementPage/FormPage';
import { OverviewPage } from './pages/ManagementPage/OverviewPage';


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
              <Route path="/faqs" element={<OverviewPage />} />
              <Route path="/faqs/create" element={<FormPage action="create"/>} />
              <Route path="/faqs/edit/:id" element={<FormPage action="edit"/>} />
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
