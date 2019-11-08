// Hook (use-auth.js)
import React, {useState, useContext, createContext} from "react";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthProvider({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);

    const imLoggedInAtStart = true; // IMPORTANT test stuff
    const me = () => {
        if (imLoggedInAtStart) {
            return Promise.resolve({ // here goes the api client.
                'username': 'mitxel',
                'email': 'myemail',
                'company': 'mycompany'
            }).then(user => {
                setUser(user);
                return user;
            });
        } else {
            return Promise.resolve().then(() => {
                setUser(false);
                return false;
            });
        }
    };

    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = (email, password) => {
        return Promise.resolve({ // here goes the api client.
            'username': 'mitxel',
            'email': 'myemail',
            'company': 'mycompany'
        }).then(user => {
            setUser(user);
            return user;
        });
    };

    const signout = () => {
        return Promise.resolve().then(() => {
            setUser(false);
            return false;
        });
    };

    // Return the user object and auth methods
    return {
        user,
        me,
        signin,
        signout,
    };
}
