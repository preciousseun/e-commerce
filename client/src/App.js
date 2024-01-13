import { Routes, Route, Navigate } from 'react-router-dom'
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from './pages/Success';
import { useDispatch, useSelector } from 'react-redux'
import { calculateProductTotals } from './redux/cartRedux';
import { useEffect } from 'react';
import UpdateUser from './pages/UpdateUser';
import Registration from './pages/Registration';



function App() {
  const user = useSelector((state) => state.user.currentUser);
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateProductTotals())
  }, [cart])

  return (
    <Routes>
      <Route>
        <Route path='/' element={<Home/>} />
        <Route path='/products/:category' element={<ProductList/>} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/register' element={ user ? <Navigate to="/" /> : <Registration/>} />
        <Route path='/login' element={ user ? <Navigate to="/" /> : <Login/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/updateuser' element={ user ? <UpdateUser /> : <Navigate to="/" /> }  />
        <Route path='/success' element={<Success/>} />
      </Route>
    </Routes>
  );
}

export default App;
