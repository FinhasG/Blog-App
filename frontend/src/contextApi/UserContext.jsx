import { createContext, useState } from 'react';

export const userContext = createContext({})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    console.log(user)

    return (<userContext.Provider value={{ user, setUser }}>
        {children}
    </userContext.Provider>)
}


