import React, { useContext, useState } from "react";

const LoginContext = React.createContext([]);

export const useLoginContext = () => useContext(LoginContext);

const LoginProvider = ({ children }) => {
	const [email, setEmail] = useState();

  const loginEmail = (emailLogin) => {
    setEmail(emailLogin)
  }

	return (
		<LoginContext.Provider
			value={{
        loginEmail,
				email,
			}}>
			{children}
		</LoginContext.Provider>
	);
};

export default LoginProvider;

