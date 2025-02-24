import {
  Route,
  Routes,
  useNavigate,
} from 'react-router';

import Landing from './Pages/Landing/Landing';
import NotFound from './Pages/NotFound';
import Transaction from './Pages/Transaction/Transaction';

function App() {
  const navigate=useNavigate();
  return (
    <>
      <div
        // style={{
        //   display: "flex",
        //   justifyContent: "center",
        //   width: "100vw",
        //   backgroundColor: "gray",
        //   height: "100vh",
        // }}
      >
        <h1 style={{ textAlign: "center", background: "gray" }} onClick={()=>navigate("/")}>XTracker</h1>
        <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path='/transaction' element={<Transaction/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
