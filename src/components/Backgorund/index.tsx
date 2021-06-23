import React, { ReactNode } from 'react';

import { styles } from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../global/styles/theme';


type Props = {
    children: ReactNode
}

export function Background({ children }: Props) {

    let { secondary80, secondary100 } = theme.colors;

    return (
        <LinearGradient
            style={styles.container}
            colors={[secondary80, secondary100]}
            locations={[0.2, 0.9]}
        >
            {children}
        </LinearGradient>
    );
};