// SignUp.js
import React, { useState } from "react";
import axios from "axios";
import '../demo.css';
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/signup", {
                name,
                email,
                mobile, 
                password,
            });

               console.log(response);
            if (response.data.success === false) {
                setError("User already exists. Change email or Log in.");
            } else if (response.data.success === true) {
                alert("Registration successful! ");
                navigate("/login"); 
            }
        } catch (err) {
            setError("An error occurred during registration.");
            console.error(err);
        }
    };

    return (
        <div className="signup">
            <h1>Register</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <p>You have an account? <Link to="/login">Sign In</Link></p>
        </div>
    );
}

export default SignUp;
