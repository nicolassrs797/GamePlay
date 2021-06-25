import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS, COLLECTION_USERS } from '../configs/database'


let { REDIRECT_URI } = process.env;
let { SCOPE } = process.env;
let { RESPONSE_TYPE } = process.env;
let { CLIENT_ID } = process.env;
let { CDN_IMAGE } = process.env;

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
    signOut: () => Promise<void>;
};

type AuthProviderProps = {
    children: ReactNode;
};

type AuthResponse = AuthSession.AuthSessionResult &{
    params: {
        access_token?: string;
        error?: string;
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

            if( type === "success" && !params.error){
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;

                let userInfo = await api.get('/users/@me');

                let firstName = userInfo.data.username.split(' ')[0];
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`

                let userData = {
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                };
                
                await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));

                setUser(userData);
            };
            
        } catch {
            throw new Error('Não foi possível autenticar');
        } finally {
            setLoading(false);
        };
    
    };

    async function signOut() {
        setUser({} as User);
        await AsyncStorage.removeItem(COLLECTION_USERS);
    }

    async function loadUserStorageData(){
        let storage = await AsyncStorage.getItem(COLLECTION_USERS);

        if(storage){
            let userLogged = JSON.parse(storage) as User;
            api.defaults.headers.authorization = `Bearer ${userLogged.token}`;
            setUser(userLogged);
        }
    };

    useEffect(() => {
        loadUserStorageData();
    },[]);

    return (
        <AuthContext.Provider value={{user, loading, signIn, signOut}}>
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