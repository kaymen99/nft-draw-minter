import "./App.css"
import { Home, Dashboard, CreateNft } from './pages'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';



function App() {

  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mint-nft" element={<CreateNft />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;