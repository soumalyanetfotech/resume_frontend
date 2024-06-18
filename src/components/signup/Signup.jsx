import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from 'react-router-dom';
import netfotechLogo from "../../Assets/Netfotech logo.png";

export default function Signup() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const register = (event) => {
        event.preventDefault();
        const { name, email, password, reEnterPassword } = user;
        if (name && email && password && (password === reEnterPassword)) {
            axios.post("http://localhost:9002/signup", user)
                .then(res => {
                    console.log(res);
                    if(res.data.success === false){
                        alert("User Already Present");
                    }
                    navigate('/login');
                })
                .catch(err => {
                    if (err.response && err.response.status === 400) {
                        alert("User already here")
                        setError("Email already registered");
                    } else {
                        setError("Error registering user");
                    }
                });
        } else {
            setError("Invalid Input");
        }
    };

    return (
        <section className="signup">
            <div className="imgBx">
                <img src={netfotechLogo} alt="Logo" />
            </div>
            <div className="contentBx">
                <div className="formBx">
                    <h2>Sign Up</h2>
                    <form onSubmit={register}>
                        {error && <p className="error">{error}</p>}
                        <div className="inputBx">
                            <span>Username</span>
                            <input type="text" name="name" value={user.name} required onChange={handleChange} />
                        </div>
                        <div className="inputBx">
                            <span>Email Id</span>
                            <input type="email" name="email" value={user.email} required onChange={handleChange} />
                        </div>
                        <div className="inputBx">
                            <span>Password</span>
                            <input type="Password" name="password" value={user.password} required pattern="(?=.*\d)(?=.*[\W_]).{7,}" title="Minimum of 7 characters. Should have at least one special character and one number." onChange={handleChange} />
                        </div>
                        <div className="inputBx">
                            <span>ReEnter-Password</span>
                            <input type="Password" name="reEnterPassword" value={user.reEnterPassword} required pattern="(?=.*\d)(?=.*[\W_]).{7,}" title="Minimum of 7 characters. Should have at least one special character and one number." onChange={handleChange} />
                        </div>
                        <div className="inputBx">
                            <input type="submit" value="Sign Up" />
                        </div>
                        <div className="inputBx">
                            <p>Already have an account? <a href="/login">Sign In</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
