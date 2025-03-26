import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import { ConfirmedDialog } from './components/ConfirmedDialog';

function App() {
  // const [isOpen, setIsOpen] = useState(true);
  // const [confirmed, setConfirmed] = useState(false);
  
  return (
    <div className="App">
      <Router>
        <div className="root-container">
          <Routes>
            {/* <Route path="/" element={
              <ConfirmedDialog 
                title="Xác nhận xóa thành tựu" 
                desc="Bạn chắc chắn muốn xóa thành tựu này? Sau khi xóa, bạn sẽ không thể khôi phục lại" 
                type="delete"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={() => setConfirmed(true)}
              />} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
