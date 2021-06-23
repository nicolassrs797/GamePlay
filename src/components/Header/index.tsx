import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import { styles } from './style';
import { theme } from '../../global/styles/theme'

type Props = {
    title: string;
    action?: ReactNode;
}

export function Header({ title, action }: Props) {

    let { secondary100, secondary40, heading } = theme.colors;

    let navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    };

    return (
        <View>
            <LinearGradient
                colors={[secondary100, secondary40]}
                style={styles.container}
            >

                <BorderlessButton onPress={handleGoBack}>
                    <Feather 
                        name="arrow-left"
                        size={24}
                        color={heading}
                    />
                </BorderlessButton>

                <Text style={styles.title}>
                    {title}
                </Text>

                {
                    action &&
                    <View>
                        {action}
                    </View>
                }

            </LinearGradient>
        </View>
    )
}