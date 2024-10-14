// // SignIn.js
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from '../AuthContext'; // Import useAuth

// function SignIn() {
//     const navigate = useNavigate();
//     const { login } = useAuth(); // Get login function from context
//     // const [name, setName] = useState(""); // New state for name
//     const [email, setEmail] = useState("");
//     // const [mobile, setMobile] = useState(""); // New state for mobile
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post("http://localhost:8080/login", {
//                 // name, // Include name in the request
//                  email,
//                 // mobile, // Include mobile in the request
//                 password,
//             });
//             if (response.data === "exist") {
//                 login(); // Set user as authenticated
//                 navigate("/data"); // Redirect to data page on successful login
//             } else {
//                 setError("Invalid email or password. Please try again.");
//             }
//         } catch (err) {
//             setError("An error occurred during login.");
//             console.error(err);
//         }
//     };

//     return (
//         <div className="signin">
//             <h1>Log In</h1>
//             {error && <p className="error">{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 {/* <input
//                     type="text"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                 /> */}
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 {/* <input
//                     type="text"
//                     placeholder="Mobile"
//                     value={mobile}
//                     onChange={(e) => setMobile(e.target.value)}
//                     required
//                 /> */}
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Log In</button>
//             </form>
//             <p>Don't have an account? <Link to="/">Sign Up</Link></p>
//         </div>
//     );
// }

// export default SignIn;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../AuthContext';

function SignIn() {
    const navigate = useNavigate();
    const { login } = useAuth(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/login", {
                email,
                password,
            });

            if (response.data.success) {
                login(); // Set user as authenticated
                // Store token in local storage or context as needed
                localStorage.setItem("token", response.data.token); // Store JWT token
                alert("Login  successfull");
                navigate("/data"); // Redirect to data page on successful login
            } else {
                setError("Invalid email or password. Please try again.");
            }
        } catch (err) {
            setError("An error occurred during login.");
            console.error(err);
        }
    };

    return (
        <div className="signin">
            <h1>Log In</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Log In</button>
            </form>
            <p>Don't have an account? <Link to="/">Sign Up</Link></p>
        </div>
    );
}

export default SignIn;

