import React, { useState } from "react";
import Header from "./Header";
import Transaction from "./Transaction";
import CashDeposite from "./CashDeposite";
import TransactionHistory from "./TransactionHistory";

function Home() {
  const [Balance, setBalance] = useState(null);
  const [BalanceVisibility , setBalanceVisibility] = useState(false);
  const [cashDepositeVisibility , setCashDepositeVisibility] = useState(false);
  const [isTransaction, setisTransaction] = useState(false);
  const [transactionHisVisibility , setTransactionHisVisibility] = useState(false)

  const toggleDivVisibility = () => {
    setisTransaction(false);
    setBalanceVisibility(false);
    setCashDepositeVisibility(false);
    setisTransaction(!isTransaction);
    setTransactionHisVisibility(false);
  };

  const balanceDivVisibility = () => {

    if(isTransaction === true) {
      setBalanceVisibility(false);
    } else {
      setBalanceVisibility(!BalanceVisibility);
    }
  }
  const toggleCashDeposite = () => {
    setBalanceVisibility(false);
    setCashDepositeVisibility(!cashDepositeVisibility);
  }

  function loadBalance() {
    const load = JSON.parse(sessionStorage.getItem("user"));
    setBalance(load.available_balance);
  }

  return (
    <>
      <Header islogin={true} />
      <section>
        <div className="flex flex-col items-center">
          <div className="container mx-auto flex justify-around my-16">
            <div className="availbleBalance | ">
              <button
                className="px-10 py-3 bg-[#1296db] text-white font-medium rounded-md block"
                onClick={() => {
                  loadBalance();
                  balanceDivVisibility();
                }}
              >
                Show/Hide Balance
              </button>
            </div>

            <div className="transaction">
              <a
                href=""
                className="px-10 py-3 bg-[#1296db] rounded-md text-white font-medium block"
                onClick={(e) => {
                  e.preventDefault();
                  toggleCashDeposite();
                }}
              >
                Cash Deposite 
              </a>
            </div>

            <div className="cashdeposite">
              <a
                href=""
                className="px-10 py-3 bg-[#1296db] rounded-md text-white font-medium block"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDivVisibility();
                  setBalanceVisibility();
                }}
              >
              Transaction/Transfer Amount
              </a>
            </div>

            <div className="TransactionHistory">
              <a
                href=""
                className="px-10 py-3 bg-[#1296db] rounded-md text-white font-medium block"
                onClick={(e) => {
                  e.preventDefault();
                  setTransactionHisVisibility(true);
                }}
              >
                Transaction History
              </a>
            </div>
          </div>

          {BalanceVisibility && (
            <div>
              <p
                id="balance"
                className="font-semibold bg-[#1296db] text-white text-2xl p-2 rounded-lg"
              >
                RS: {Balance}
              </p>
            </div>
          )}

          {isTransaction && (
            <div>
             <Transaction />
            </div>
          )}

          {cashDepositeVisibility && 
          (<div>
            <CashDeposite />
          </div>
          )}
          {transactionHisVisibility && 
          (<div>
            <TransactionHistory />
          </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
