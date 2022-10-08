
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CaptionCarousel } from './Components/carousel';
import { Cart } from './Components/Cart';
import Dashboard from './Components/Dashboard';
import Footer from './Components/Footer';
import { Home } from './Components/Home';
import { Login } from './Components/Login';
import { Navbar } from './Components/Navbar';
import { Products } from './Components/Products';
import { Signup } from './Components/Signup';
import { SingleProduct } from './Components/SingleProduct';
import { UserDetails } from './Components/UserDetails';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/product' element={<Products />}></Route>
        <Route path='/product/:id' element={<SingleProduct />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/userdetail' element={<UserDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
