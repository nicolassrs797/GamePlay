import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';
import { Home } from '../screens/HomeScreen';

let{ Navigator, Screen } = createStackNavigator();

export function AuthRoutes(){

    return(
        <Navigator
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    backgroundColor: 'transparent'
                }
            }}
        >
            <Screen 
                name="SignIn"
                component={SignIn}
            />
            <Screen 
                name="Home"
                component={Home}
            />
        </Navigator>
    );

};
