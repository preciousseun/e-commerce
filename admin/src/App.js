import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import './app.css'
import Home from "./pages/home/Home";
import { Routes, Route, Navigate } from 'react-router-dom'
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from './pages/newUser/NewUser'
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/Login/Login";
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SignIn from "./pages/SignIn/SIgnIn";



function App() {

  const admin = useSelector((state) => state.user.currentUser)

  const AppLayout = ({admin}) => admin ? (
    <>
        <Topbar />
        <div className="appContainer">
          <Sidebar/>
          <Outlet />
        </div>
    </>
  ) : null

  return (
    <Routes>
      <Route>
        <Route path="/signin" element={admin ? <Home/> : <SignIn />} />
        <Route element={<AppLayout admin={admin}/>}>
              <Route index element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/newProduct" element={<NewProduct />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
