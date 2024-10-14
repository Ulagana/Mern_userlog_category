// import React from "react";
// import './demo.css';
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import SignUp from "./components/SignUp";
// import SignIn from "./components/SignIn";
// import Data from "./components/Data";
// import { AuthProvider } from './AuthContext';

// // import Admin from "./admin"


// function App() {

//   const Secure = ({ component: Component }) => {
//     const isAuthenticated = JSON.parse(localStorage.getItem('auth'));
//     return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
//   };

//   const InSecure = ({ component: Component }) => {
//     const isAuthenticated = JSON.parse(localStorage.getItem('auth'));
//     return !isAuthenticated ? <Component /> : <Navigate to="/data" replace />;
//   };

//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/"element={<InSecure component={SignUp} />} />
//           <Route path="/login" element={<InSecure component={SignIn} />} />

//           <Route
//             path="/data"
//             element={<Secure component={Data} />}

//           />

//                   {/* <Admin /> */}

//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

//////////////////////////////////////////////

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Category from './pages/category';
import Subcategory from './pages/subcategory';
import Product from './pages/product';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Admin Panel</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">category</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Subcategory">subcategory</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/product">product</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Category />} />
            <Route path="/Subcategory" element={<Subcategory />} />
            <Route path="/product" element={<Product />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;








