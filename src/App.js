
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Login } from './Auth/Login';
import { AgentCarInspection } from './Admin/AgentCarInspection';
import { AgentCarCalender } from './Admin/AgentCarCalender';
import { AgentViewPostedInspection } from './Admin/AgentViewPostedInspection';
import { AgentCarDetailsPopup } from './Admin/AgentCarDetailsPopup';
import { AgentViewinspection } from './Admin/AgentViewinspection';
import { AgentCarView } from './Admin/AgentCarView';
import { AgentNav } from './Admin/AgentNav';
import { Bos } from './Admin/Bos';
import { BosCarDetails } from './Admin/BosCarDetails';
import { SellerBos }  from './Admin/SellerBos';
import { DealerBos } from './Admin/DealerBos';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/agent-car-inspection" element={<AgentCarInspection />} />
          <Route path="/agent-car-calender" element={<AgentCarCalender />} />
          <Route path="/agent-view-posted-inspection/:Vehicle_Id" element={<AgentViewPostedInspection />} />
          <Route path="/agent-car-details-popup/:Vehicle_Id" element={<AgentCarDetailsPopup />} />
          <Route path="/agent-view-inspection" element={<AgentViewinspection />} />
          <Route path="/agent-car-view" element={<AgentCarView />} />
          <Route path="/AgentNav" element={<AgentNav />} />
          <Route path="/bos" element={<Bos />} />
          <Route path="/bos-car-details/:Vehicle_Id" element={<BosCarDetails />} />
          <Route path="/seller-bos/:sellerid/:Vehicle_Id" element={<SellerBos />} />
          <Route path="/dealer-bos/:Vehicle_Id" element={<DealerBos />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
