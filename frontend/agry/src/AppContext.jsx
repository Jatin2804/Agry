import React, { createContext, useState, useContext, useEffect } from "react";

// Create context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("loggedIn")) || false
  );
  const [userData, setUserData] = useState(
    () => JSON.parse(localStorage.getItem("userData")) || {}
  );
  const [amount, setAmount] = useState(
    () => JSON.parse(localStorage.getItem("amount")) || 0
  );
  const [profit, setProfit] = useState(
    () => JSON.parse(localStorage.getItem("profit")) || 0
  );
  const [cartData, setCartData] = useState(
    () => JSON.parse(localStorage.getItem("cartData")) || []
  );
  const [billData, setBillData] = useState(
    () => JSON.parse(localStorage.getItem("billData")) || []
  );
  const [cartTotal, setCartTotal] = useState(
    () => JSON.parse(localStorage.getItem("cartTotal")) || 0
  );
  const [billTotal, setBillTotal] = useState(
    () => JSON.parse(localStorage.getItem("billTotal")) || 0
  );

  // Single useEffect for synchronizing all states with local storage
  useEffect(() => {
    const saveToLocalStorage = () => {
      localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("amount", JSON.stringify(amount));
      localStorage.setItem("profit", JSON.stringify(profit));
      localStorage.setItem("cartData", JSON.stringify(cartData));
      localStorage.setItem("billData", JSON.stringify(billData));
      localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
      localStorage.setItem("billTotal", JSON.stringify(billTotal));
    };

    saveToLocalStorage();
  }, [loggedIn, userData, amount, profit, cartData, billData, cartTotal, billTotal]);

  return (
    <AppContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        userData,
        setUserData,
        amount,
        setAmount,
        profit,
        setProfit,
        cartData,
        setCartData,
        billData,
        setBillData,
        cartTotal,
        setCartTotal,
        billTotal,
        setBillTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};
