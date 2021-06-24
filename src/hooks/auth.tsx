import React, { createContext, ReactNode, useContext, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import {REDIRECT_URI, SCOPE, RESPONSE_TYPE, CLIENT_ID, CDN_IMAGE} from '../configs';
import { api } from '../services/api';

type User = {
    id: string;
    username: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
};

type AuthContextData = {
    user: User;
    loading: boolean;
    signIn: () => Promise<void>;
};

type AuthProviderProps = {
    children: ReactNode;
};

type AuthResponse = AuthSession.AuthSessionResult &{
    params: {
        access_token: string;
    }
};

export let AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

    let [user, setUser] = useState<User>({} as User);
    let [loading, setLoading] = useState(false);

    async function signIn(){

        try {

            setLoading(true);

            let authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            let { type, params } = await AuthSession.startAsync({authUrl}) as AuthResponse;

            if( type === "success" ){
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;

                let userInfo = await api.get('/users/@me');

                let firstName = userInfo.data.username.split(' ')[0];
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`

                setUser({
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                });

                setLoading(false);
            } else {
                setLoading(false);
            }
            
        } catch {
            throw new Error('Não foi possível autenticar');
        }
    
    };

    return (
        <AuthContext.Provider value={{user, loading, signIn}}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(){
    
    let context = useContext(AuthContext);

    return context;

};

export {
    AuthProvider,
    useAuth
}