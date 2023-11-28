import React, { useState } from "react";
import person_icon from "../images/person.png";
import email_icon from "../images/email.png";
import password_icon from "../images/password.png";
import cash_icon from "../images/cash.png";
import Header from "./Header";

function setDataLocal(key, value) {
  value = localStorage.setItem(key, JSON.stringify(value));
}

function getDataLocal(key) {
  key = localStorage.getItem(key);
  if (key) {
    return JSON.parse(key);
  }
  return [];
}
const isEmailValid = (email) => {
  const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailPattern.test(email);
};

const isStrongPassword = (password) => {
  // At least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
};



function SignUp() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    available_balance: "",
  });


  const [Errormessage, setErrorMessage] = useState();
  const [Successmessage, setSuccessMessage] = useState();


  // Submit button function

  const submit = () => {

    if(data.name.length < 3){
      setErrorMessage("Name should be more than 3 characher");
      return;
    }

    if (!isEmailValid(data.email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (!isStrongPassword(data.password)) {
      setErrorMessage("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    if (data.available_balance < 5000) {
      setErrorMessage("Initail Deposite Should be more than 5000");
      setSuccessMessage(null);
    } else {
      let arr = getDataLocal("users");
      const record = arr.find((e) => {
        return e.email == data.email;
      });

      if (record !== null && typeof record !== "undefined") {
        setSuccessMessage(null);
        setErrorMessage("Email already registered");
      } else {
        arr.push(data);
        setDataLocal("users", arr);
        reset();
        setErrorMessage(null);
        setSuccessMessage("User Registed Successfully");
      }
    }
  };

  //Reset state data

  const reset = () => {
    setData({
      ...data,
      name: "",
      email: "",
      password: "",
      available_balance: "",
    });
  };

  return (
    <>
      <Header  islogin={false}/>
      <section>
        <div className="container mx-auto h-[100vh] flex justify-center items-center">
          <div className="w-[25%] flex">
            <form
              className="space-y-5 text-center shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)] px-5 py-6 rounded-md"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <div>
                <h1 className="text-[#1296db]  font-semibold">
                  UBL - Open An Account Using E-mail
                </h1>
              </div>
              {Errormessage ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {Errormessage}
                </div>
              ) : (
                <></>
              )}

              {Successmessage ? (
                <div
                  className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                  role="alert"
                >
                  {Successmessage}
                </div>
              ) : (
                <></>
              )}

              <div className="flex space-x-3 bg-slate-200 px-5 py-2 rounded-md shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]">
                <img src={person_icon} className="w-6" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="outline-none bg-transparent"
                  onChange={(e) => {
                    setData({ ...data, name: e.target.value });
                  }}
                  value={data.name}
                />
              </div>

              <div className="flex space-x-3 bg-slate-200 px-5 py-2 rounded-md shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]">
                <img src={email_icon} className="w-6" />
                <input
                  type="text"
                  placeholder="E-mail"
                  className="outline-none bg-transparent"
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                  value={data.email}
                />
              </div>
              <div className="flex space-x-3 bg-slate-200 px-5 py-2 rounded-md shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]">
                <img src={password_icon} className="w-6" />
                <input
                  type="password"
                  placeholder="Password"
                  className="outline-none bg-transparent"
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                  value={data.password}
                />
              </div>
              
              <div className="flex space-x-3 bg-slate-200 px-5 py-2 rounded-md shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]">
                <img src={cash_icon} className="w-6" />
                <input
                  type="number"
                  placeholder="Initial Deposite"
                  className="outline-none bg-transparent appearance-none remove-arrow"
                  onChange={(e) => {
                    setData({ ...data, available_balance: e.target.value });
                  }}
                  value={data.available_balance}
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  className="bg-[#1296db] text-white font-semibold w-full py-2 rounded-md shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>


  );
}

export default SignUp;
