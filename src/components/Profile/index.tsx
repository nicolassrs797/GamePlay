import React from 'react';
import { View, Text } from 'react-native';

import { Avatar } from '../Avatar';

import { styles } from './style';

export function Profile(){
    return(
        <View style={styles.container}>

            <Avatar urlImage="https://instagram.fgyn22-1.fna.fbcdn.net/v/t51.2885-19/s150x150/121508526_345313186745650_1326525589634354449_n.jpg?tp=1&_nc_ht=instagram.fgyn22-1.fna.fbcdn.net&_nc_ohc=PFbc9j_eU9kAX_qSW7B&edm=AB32dywBAAAA&ccb=7-4&oh=96fdeebe1bc8e9be43e1f965664808df&oe=60D8DE70&_nc_sid=c59781"/>
            
            <View>

                <View style={styles.user}>

                    <Text style={styles.greeting}>
                        Olá,
                    </Text>

                    <Text style={styles.username}>
                        Nicolas
                    </Text>

                </View>

                <Text style={styles.message}>
                    Hoje é dia de vitória
                </Text>

            </View>
        </View>
    );
};