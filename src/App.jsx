// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import "./App.css";
// import Header from "./assets/Components/Header/Header";
// import Register from "./assets/Components/Register/Register";
// import Login from "./assets/Components/Login/Login";
// import ProductList from "./assets/Components/ProductList/ProductList";
// import ProductDetails from "./assets/Components/ProductDetails/ProductDetails";
// import Profile from "./assets/Components/Profile/Profile";
// import AddProduct from "./assets/Components/AddProduct/AddProduct";

// function App() {
//   return (
//     // <Router>
//     //   <Header />
//     //   <AddProduct />
//     // </Router>
//     <Router>
//       <Header />

//       <Routes>
//         <Route
//           path="/"
//           element={
//             <Login onLogin={() => localStorage.setItem("isLoggedIn", "true")} />
//           }
//         />
//         <Route path="/register" element={<Register />} />

//         {/* Protected Routes */}
//         <Route
//           path="/list"
//           element={
//             localStorage.getItem("isLoggedIn") === "true" ? (
//               <ProductList />
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             localStorage.getItem("isLoggedIn") === "true" ? (
//               <Profile />
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }
//         />
//         <Route
//           path="/products/:id"
//           element={
//             localStorage.getItem("isLoggedIn") === "true" ? (
//               <ProductDetails />
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }
//         />

//         <Route path="/details" element={<ProductDetails />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./assets/Components/Header/Header";
import Register from "./assets/Components/Register/Register";
import Login from "./assets/Components/Login/Login";
import ProductList from "./assets/Components/ProductList/ProductList";
import ProductDetails from "./assets/Components/ProductDetails/ProductDetails";
import Profile from "./assets/Components/Profile/Profile";
import Cart from "./assets/Components/Cart/Cart";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/list"
          element={isLoggedIn ? <ProductList /> : <Navigate to="/" replace />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/" replace />}
        />
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/" replace />}
        />
        <Route
          path="/products/:id"
          element={
            isLoggedIn ? <ProductDetails /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
