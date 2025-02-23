import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LogInPage } from './pages/LogInPage';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="root-container">
          <Routes>
            <Route path="/" element={<LogInPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
