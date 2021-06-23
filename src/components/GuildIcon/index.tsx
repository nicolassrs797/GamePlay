import React from 'react';
import { Image } from 'react-native';

import { styles } from './style';

export function GuildIcon() {

    let uri = 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/harbinger-l10-website/pt-br/production/pt-br/static/placeholder-1c66220c6149b49352c4cf496f70ad86.jpg'

    return (

        <Image
            source={{ uri }}
            style={styles.image}
            resizeMode='cover'
        />

    );
};