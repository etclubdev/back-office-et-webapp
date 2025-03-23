import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfirmedDialog } from './components/ConfirmedDialog';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="root-container">
          <Routes>
            {/* <Route path="/" element={
              <ConfirmedDialog 
                title="Thông báo" 
                desc="Bạn có chắc chắn muốn mở đơn tìm kiếm CTV ?" 
                type="info"
              />} />
            <Route path="/" element={
              <ConfirmedDialog 
                title="Thông báo" 
                desc="Bạn có chắc chắn muốn đóng đơn tìm kiếm CTV ?" 
                type="warning"
              />} /> */}
            <Route path="/" element={
              <ConfirmedDialog 
                title="Xác nhận xóa thành tựu" 
                desc="Bạn chắc chắn muốn xóa thành tựu này? Sau khi xóa, bạn sẽ không thể khôi phục lại" 
                type="delete"
              />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
