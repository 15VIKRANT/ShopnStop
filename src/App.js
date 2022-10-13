
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CaptionCarousel } from './Components/carousel';
import { Cart } from './Components/Cart';
import { Contactus } from './Components/Contactus';
import Dashboard from './Components/Dashboard';
import Footer from './Components/Footer';
import { Home } from './Components/Home';
import { Login } from './Components/Login';
import { Navbar } from './Components/Navbar';
import { Orders } from './Components/Orders';
import { Products } from './Components/Products';
import { Signup } from './Components/Signup';
import { SingleProduct } from './Components/SingleProduct';
import { UserDetails } from './Components/UserDetails';

function App() {
  let userData = JSON.parse(localStorage.getItem('login')) || [];
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/product' element={<Products />}></Route>
        <Route path='/product/:id' element={<SingleProduct />}></Route>
        <Route path='/orders/:id' element={<Orders/>}></Route>
        <Route path='/cart' element={userData.length!==0? <Cart/>:<Login/>}></Route>  
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={userData.length!==0 && userData.user.role=="admin" ?<Dashboard/>:<Login/>}></Route>
        <Route path='/userdetail' element={<UserDetails />}></Route>
        <Route path='/contactus' element={<Contactus/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
