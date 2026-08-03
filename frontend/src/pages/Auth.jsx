import "./Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Auth(){

    const navigate=useNavigate();

    const [isLogin,setIsLogin]=useState(true);
    const [loading,setLoading]=useState(false);

    const [formData,setFormData]=useState({

        name:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    };

    async function handleSubmit(e){
        e.preventDefault();
        if(!isLogin && formData.password!==formData.confirmPassword){
            return alert("Passwords do not match");
        }

        try{
           setLoading(true);
           if(isLogin){

            const response=await api.post("/auth/login",{
                email:formData.email,
                password:formData.password
            })

            localStorage.setItem(
                    "token",
                    response.data.token
                );

                navigate("/");
           }else{
              
              await api.post("/auth/register",{
                name:formData.name,
                email:formData.email,
                password:formData.password
              });

              alert("Registration Successful!");

              setIsLogin(true);
           }
        }catch(error){

             alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }finally{
            setLoading(false);
        }
    }

    return (

        <div className="auth-page">
            <form
              className="auth-card"
              onSubmit={handleSubmit}
            >
                <h2>
                    {isLogin? "Welcome Back":"Create Account"}
                </h2>

                <p>
                  {isLogin? "Login to continue learning":"Join StudySense AI"}

                </p>

                {!isLogin && (
                    <input 
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                    
                )}

                 <input 
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                />

                 <input 
                      type="text"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                />

                {!isLogin && (

                    <input

                        type="password"

                        name="confirmPassword"

                        placeholder="Confirm Password"

                        value={formData.confirmPassword}

                        onChange={handleChange}

                        required

                    />

                )}

                <button type="submit">
                    { loading
                    ? "Please Wait": isLogin ? "Login":"Register"
                    }

                </button>

                <div className="switch-auth">

                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}

                    <span

                        onClick={() => setIsLogin(!isLogin)}

                    >

                        {isLogin
                            ? " Register"
                            : " Login"}

                    </span>

                </div>

            </form>
        </div>
    )
}