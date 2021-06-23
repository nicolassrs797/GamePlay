import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text, View } from 'react-native';

import { GuildIcon } from '../GuildIcon';

import { styles } from './style';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';

export type GuildProps = {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
};

type Props = TouchableOpacityProps &{
    data: GuildProps;
};

export function Guild({data, ...rest}: Props) {



    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.6}
            {...rest}
        >

            <GuildIcon />

            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>
                        {data.name}
                    </Text>

                    <Text style={styles.owner}>
                        {data.owner ? 'Administrador' : 'Convidado'}
                    </Text>
                </View>
            </View>

            <Feather
                name="chevrons-right"
                color={theme.colors.heading}
                size={24}
            />

        </TouchableOpacity>
    );
};