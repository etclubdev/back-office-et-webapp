import './App.css';
import { useEffect } from 'react';
import { generateTraceId } from './utils/trace';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { LogInPage } from './pages/LogInPage';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { WelcomePage } from './pages/WelcomePage';

function App() {
  useEffect(() => {
    generateTraceId();
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <div className="root-container">
            <Routes>
              {/* Public route */}
              <Route path="/login" element={<LogInPage />} />

              {/* Protected routes */}
              <Route element={<RequireAuth />}>
                <Route element={<MainLayout />}>
                 <Route path="/" element={<WelcomePage />} />
                </Route>
              </Route>

              {/* Unauthorized */}
              {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
