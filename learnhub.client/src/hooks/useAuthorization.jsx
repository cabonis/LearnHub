import React, { useState, useEffect, useContext, createContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from "axios";
import Working from "../components/Working";


const UserContext = createContext({});

function AuthorizeView({ children }) {

    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {

        let retryCount = 0;
        let maxRetries = 10;
        let delay = 1000;

        function wait(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        async function getUserWithRetry() {
            try {
                await axios.get(`/api/auth`)
                    .then((resp) => {
                        setUser(resp.data);
                        setIsAuthorized(true);
                    })
                    .catch((error) => {
                        if (error.status !== 401) {
                            throw new Error(error.status);
                        }
                    })
            } catch (error) {
                retryCount++;
                if (retryCount > maxRetries) {
                    throw error;
                } else {
                    await wait(delay);
                    return getUserWithRetry();
                }
            }
        }

        getUserWithRetry()
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);


    if (isLoading) {
        return (<Working />);
    }
    else {
        if (isAuthorized && !isLoading) {
            return (<UserContext.Provider value={user}>{children}</UserContext.Provider>);
        } else {
            return (<Navigate to="/login" />)
        }
    }

}

const useAuthorizedUser = () => {
    return useContext(UserContext);
}

export { AuthorizeView, useAuthorizedUser };