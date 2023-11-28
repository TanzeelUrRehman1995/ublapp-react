import React, { useState } from "react";
import email_icon from "../images/email.png";
import password_icon from "../images/password.png";
import Header from "./Header";

function Login() {
  const [action, setAction] = useState(
    {
      email: "",
      password: "",
    },
  );

  function loadData(key){
    const value = localStorage.getItem(key)
    if(value){
      return JSON.parse(value)
    }
  }

  function setSessionData(key , value) {
      sessionStorage.setItem(key , JSON.stringify(value));
  }

  const submit = ()=>{
    
    let userData = loadData("users");
    const  checkUserData = userData.find((e) => e.email === action.email && e.password === action.password);
    console.log(checkUserData);
    if(checkUserData == null){
      console.log("Invalid credentials")
    }
    else{
  location.assign('/home');
     
      setSessionData("user",checkUserData);
    }
  }
  return (
    <>
    <Header islogin={false}/>
    <section>
      <div className="container mx-auto h-[100vh] flex justify-center items-center">
        <div className="w-[25%] flex">
          <form className="space-y-5 text-center shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)] px-5 py-6 rounded-md" onSubmit={(e)=>{e.preventDefault(); submit()}}>
            <div>
              <h1 className="text-[#1296db]  font-semibold">
                UBL - Netbanking Login
              </h1>
            </div>
           
            <div className="flex space-x-3 bg-slate-200 px-5 py-2 rounded-md shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]">
              <img src={email_icon} className="w-6" />
              <input
              required
                type="email"
                placeholder="E-mail"
                className="outline-none bg-transparent"
                onChange={(e) => {
                  setAction( (action) => ({
                    ...action, email: e.target.value
                  }))
                }}
                value={action.email}
              />
            </div>
            <div className="flex space-x-3 bg-slate-200 px-5 py-2 rounded-md shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]">
              <img src={password_icon} className="w-6" />
              <input
              required
                type="password"
                placeholder="Password"
                className="outline-none bg-transparent"
                onChange={(e) => {
                  setAction((action) => ({
                    ...action, password: e.target.value
                  }))
                }}
                value={action.password}
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="bg-[#1296db] text-white font-semibold w-full py-2 rounded-md shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section></>
  );
}

export default Login;
