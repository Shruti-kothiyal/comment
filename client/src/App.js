import './App.css';
import UserLogin from './user/userLogin';
import UserRegister from "./user/userRegistration"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/api/user/register" element={<UserRegister/>}>
        </Route>
        <Route path="/api/user/login" element={<UserLogin/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
