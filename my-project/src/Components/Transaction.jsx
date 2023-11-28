import React, { useState } from 'react';
import email_icon from "../images/email.png";
import cash_icon from "../images/cash.png";


function Transaction() {
    var [transaction, setTransaction] = useState({
        transaction_id: "",
        sender: "",
        receiver: "",
        transaction_amount: "",
      });
      console.log(transaction.email);
      const [transactionError ,setTransactionError] = useState()

      function getLocalData(key){
        const data = localStorage.getItem(key);
        if (data){
          return JSON.parse(data);
        }
        return [];
      }

      function getSessionData(key){
       return JSON.parse(sessionStorage.getItem(key));
      }

      function setItemLocal(key, data){
        return localStorage.setItem(key, JSON.stringify(data));
      }

      function submit(){
        let localData = getLocalData("users");
        let verifyEmail = localData.find((e)=>{
         return  e.email == transaction.receiver
        })
        if(typeof verifyEmail === 'undefined' ){
          setTransactionError("Record not found. Please provide valid E-mail");
        }
         else if(getSessionData("user").email == transaction.receiver){
          setTransactionError("Transaction Failed! This email is yours. Kindly provide valid Email");
        } 
        
        else {
          let sessionData = getSessionData("user");
          let getUserFromLocal = localData.find((e) => {
            return e.email == sessionData.email
          })
          const senderBalance = parseInt(getUserFromLocal.available_balance);
          const available_balance = parseInt(verifyEmail.available_balance );
          const input_transaction_amount = parseInt(transaction.transaction_amount);

          verifyEmail.available_balance = available_balance + input_transaction_amount;
          getUserFromLocal.available_balance = senderBalance - input_transaction_amount;

          transaction.transaction_id = Date.now();
          transaction.sender = getSessionData("user").email;
          // transaction.receiver = verifyEmail.email;
          localStorage.setItem("users",JSON.stringify(localData));
          sessionStorage.setItem("user",JSON.stringify(getUserFromLocal));
          setTransactionError("Transaction Sucessfully Done");
          
          let transactions = getLocalData("transactions") ;
          transactions.push(transaction);
          setItemLocal("transactions" , transactions);
          console.log(transactions);
        }
       
      }

      const reset = () => {
        setTransaction(
          {
            ...transaction,
            receiver: "",
            transaction_amount: "",
          }
        );
      };
    
  return (
    <>
     <form className="w-full space-y-5 text-center shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)] px-5 py-6 rounded-md" 
              onSubmit={(e)=>{e.preventDefault(); submit(); reset();}}
              >
                {transactionError ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {transactionError}
                </div>
              ) : (
                <></>
              )}
                <div className="flex space-x-3 bg-slate-200 px-5 py-2 rounded-md shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]">
                  <img src={email_icon} className="w-6" />
                  <input
                    required
                    type="email"
                    placeholder="E-mail"
                    className="outline-none bg-transparent"
                    onChange={(e) => {
                      setTransaction((transaction) => ({
                        ...transaction,
                        receiver: e.target.value,
                      }));
                    }}
                    value={transaction.receiver}
                  />
                </div>

                <div className="flex space-x-3 bg-slate-200 px-5 py-2 rounded-md shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]">
                  <img src={cash_icon} className="w-6" />
                  <input
                    required
                    type="number"
                    placeholder="Amount to be transfer"
                    className="outline-none bg-transparent appearance-none remove-arrow"
                    onChange={(e) => {
                      setTransaction((transaction)=> ({
                        ...transaction, 
                        transaction_amount: e.target.value 
                      }));
                    }}
                    value={transaction.transaction_amount}
                  />
                </div>
                <div>
                <button
                  type="submit"
                  className="bg-[#1296db] text-white font-semibold w-full py-2 rounded-md shadow-[0_3px_7px_-3px_rgba(0,0,0,0.3)]"
                >
                  Transfer
                </button>
              </div>
              </form></>
    )
}

export default Transaction;