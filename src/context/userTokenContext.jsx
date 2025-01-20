import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export let UserTokenContext = createContext(null);

function decodeToken() {
  const token = localStorage.getItem("token");
  return token ? jwtDecode(token) : null;  // Return null if there's no token
}

export default function UserTokenContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      const decoded = decodeToken();
      if (decoded) {
        console.log(decoded); // Log the decoded token object
        setUserId(decoded.id); // Set userId if decoding is successful
      }
    }
  }, []);

  return (
    <UserTokenContext.Provider value={{ token, setToken, userId, setUserId, decodeToken }}>
      {children}
    </UserTokenContext.Provider>
  );
}
