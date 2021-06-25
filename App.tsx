import React from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import { Background } from './src/components/Backgorund';

import { Routes } from './src/routes';
import { AuthProvider } from './src/hooks/auth';

import AppLoading from 'expo-app-loading';

import { COLLECTION_APPOINTMENTS } from './src/configs/database';

export default function App() {

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold,
  });

  async function erase() {
    await AsyncStorage.removeItem(COLLECTION_APPOINTMENTS);
  }

  if (!fontsLoaded) {
    return (
      <AppLoading />
    );
  }

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <AuthProvider>
        <Routes />
      </AuthProvider>


    </Background>
  );
}