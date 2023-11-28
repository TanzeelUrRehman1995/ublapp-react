import React, { useState } from 'react'
import email_icon from "../images/email.png";
import cash_icon from "../images/cash.png";
import { json } from 'react-router-dom';

function CashDeposite() {

    function getDataLocal(key) {
       const data = localStorage.getItem(key);
        if (data) {
          return JSON.parse(data);
        }
        return [];
      }

    function getSessionData(key){
        return JSON.parse(sessionStorage.getItem(key));
       }

    const [deposite , setDeposite] = useState({
        email : "",
        deposite_amount : "",
    });

    const [depositeErrormessage , setdepositeErrormessage] = useState();
    const [depositeSuccessmessage , setDepositeSuccessmessage] = useState();

    

    function submit(){
        let localSData = getDataLocal("users");
        const depositeEmailveriification = localSData.find((e) =>{
            return e.email == deposite.email;
        })
        console.log(deposite.email);
        if(depositeEmailveriification.email !== getSessionData("user").email){
            setdepositeErrormessage("Please! Provide your E-mail");
        }
        else{
            const available_balance = parseInt(depositeEmailveriification.available_balance); 
            const input_amount = parseInt(deposite.deposite_amount);

            depositeEmailveriification.available_balance = available_balance + input_amount;

            localStorage.setItem("users", JSON.stringify(localSData));
            sessionStorage.setItem("user", JSON.stringify(depositeEmailveriification));
            setDepositeSuccessmessage("Amount Deposited!");
        }
    }
  return (
    <>
     <section>
            <form
              className="space-y-5 text-center shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)] px-5 py-6 rounded-md"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <div>
                <h1 className="text-[#1296db]  font-semibold">
                  Cash Deposite Form
                </h1>
              </div>
              {depositeErrormessage ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {depositeErrormessage}
                </div>
              ) : (
                <></>
              )}

              {depositeSuccessmessage ? (
                <div
                  className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                  role="alert"
                >
                  {depositeSuccessmessage}
                </div>
              ) : (
                <></>
              )}


              <div className="flex space-x-3 bg-slate-200 px-5 py-2 rounded-md shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]">
                <img src={email_icon} className="w-6" />
                <input
                  type="text"
                  placeholder="E-mail"
                  className="outline-none bg-transparent"
                  onChange={(e) => {
                    setDeposite({ ...deposite, email: e.target.value });
                  }}
                  value={deposite.email}
                />
              </div>
              
              <div className="flex space-x-3 bg-slate-200 px-5 py-2 rounded-md shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]">
                <img src={cash_icon} className="w-6" />
                <input
                  type="number"
                  placeholder="Cash to be deposite"
                  className="outline-none bg-transparent appearance-none remove-arrow"
                  onChange={(e) => {
                    setDeposite({ ...deposite, deposite_amount: e.target.value });
                  }}
                  value={deposite.deposite_amount}
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  className="bg-[#1296db] text-white font-semibold w-full py-2 rounded-md shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]"
                >
                  Deposite
                </button>
              </div>
            </form>
      </section>
    </>
  )
}

export default CashDeposite;