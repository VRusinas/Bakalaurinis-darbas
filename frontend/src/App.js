import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Schedules from "./pages/Schedules";
import Login from "./pages/Login";
import Registration from "./pages/Signup";
import ActivityCreation from "./pages/ActivityCreation";
import Navbar from "./components/Navbar";

import { ItemDetails, Specialists} from "./components/specialists/Specialists";

import Aerobics from "./components/training/Aerobics";
import WeightTraining from "./components/training/WeightTraining";
import FlexibilityTraining from "./components/training/FlexibilityTraining";
import Yoga from "./components/training/Yoga";
import MobilityTraining from "./components/training/MobilityTraining";

import Saunas from "./pages/Saunas";
import Pool from "./pages/Pool";

import Dashboard from "./components/UserDashboard";
import SportsMassage from "./components/massages/SportsMassage";
import DeepTisueMassage from "./components/massages/DeepTisueMassage";
import PressurePointMassage from "./components/massages/PressurePointMassage";
import HotStoneMassage from "./components/massages/HotStoneMassage";
import LymphaticDrainageMassage from "./components/massages/LymphaticDrainageMassage";
import DataDashboard from "./pages/DataDashboard";
import Footer from "./components/Footer";
import DryNeedling from "./components/physiotherapy/DryNeedling";
import SportsPhysiotherapy from "./components/physiotherapy/SportsPhysiotherapy";
import OrthopedicPshysiotherapy from "./components/physiotherapy/OrthopedicPshysiotherapy";
import Contatcs from "./pages/Contatcs";
import AskUs from "./pages/AskUs";

import "./styles/global.css"

function App() {
  const {user} = useAuthContext();

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>

            <Route path="/" element={ <Home /> } /> 

            <Route path="/specialists/:itemName" element={<ItemDetails />} />
            <Route path="/specialists/" element={<Specialists />} />

            <Route path="/schedules/trainer" element={ <Schedules /> } /> 
            <Route path="/schedules/MassageTherapist" element={ <Schedules /> } /> 
            <Route path="/schedules/Physiotherapist" element={ <Schedules /> } /> 
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/activityCreation"/>} />
            <Route path="/signup" element={!user ? <Registration /> : <Navigate to="/activityCreation"/>} />
            <Route path="/activityCreation" element={user ? <ActivityCreation /> : <Navigate to="/login"/>} />
        
            <Route path="/training/aerobics" element={ <Aerobics /> } />
            <Route path="/training/weightTraining" element={ <WeightTraining /> } />
            <Route path="/training/flexibilityTraining" element={ <FlexibilityTraining /> } />     
            <Route path="/training/yoga" element={ <Yoga /> } />
            <Route path="/training/mobilityTraining" element={ <MobilityTraining /> } />

            <Route path="/massages/sports" element={ <SportsMassage /> } />
            <Route path="/massages/deepTissue" element={ <DeepTisueMassage /> } />
            <Route path="/massages/pressurePoint" element={ <PressurePointMassage /> } />
            <Route path="/massages/hotStone" element={ <HotStoneMassage /> } />
            <Route path="/massages/lymphaticDrainage" element={ <LymphaticDrainageMassage /> } />

             <Route path="/physiotherapy/dryNeedling" element={ <DryNeedling /> } />
             <Route path="/physiotherapy/sportsPhysiotherapy" element={ <SportsPhysiotherapy /> } />
             <Route path="/physiotherapy/orthopedicPhysiotherapy" element={ <OrthopedicPshysiotherapy /> } />

            <Route path="/saunas" element={ <Saunas /> } /> 

            <Route path="/pool" element={ <Pool /> } /> 

            <Route path="/dashboard" element={ <Dashboard /> } /> 

            <Route path="/dataDashboard" element={<DataDashboard />} /> 

            <Route path="/contacts" element={<Contatcs />} /> 

            <Route path="/askUs" element={<AskUs />} /> 

          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
