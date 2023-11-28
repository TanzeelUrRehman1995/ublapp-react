import React from 'react';

function Header({ islogin }) {
  function clearSession() {
    sessionStorage.clear();
  }
  return (
    <header className="bg-[#1296db]">
      <div className="container mx-auto flex justify-between items-center text-white py-3">
        <div className="w-1/2 text-2xl font-semibold">UBL</div>
        <div className="w-1/2 flex justify-end space-x-7 font-medium">
          {islogin === true ? (
            <a href="/login" onClick={()=>{clearSession()}}>Logout</a>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/">Sign Up</a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
