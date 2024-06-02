import './App.css'
import Home from './pages/Home'
import Navbar from './component/Navbar'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import Privateroute from './component/PrivateRoute'
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Privateroute><Home /></Privateroute>} />
        <Route path='/product/:id' element={<Privateroute> <ProductDetails /> </Privateroute>} />
      </Routes>
    </>
  )
}

export default App
