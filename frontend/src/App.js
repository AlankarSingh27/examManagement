
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from './page/LoginPage';
import Admin from './page/Admin';
import UserPage from './page/UserPage'
function App() {
  return (
    <>
    <BrowserRouter>

<Routes>
  <Route path='/' element={<LoginPage/>} />
  <Route path='/login' element={<LoginPage/>} />
  <Route path='/admin' element={<Admin />} />
  <Route path='/user' element={<UserPage/>} />
</Routes>
</BrowserRouter>
    </>
  );
}

export default App;
