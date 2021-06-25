import React from 'react';
import { View, Image } from 'react-native';

import { styles } from './style';
import DiscordSvg from '../../assets/discord.svg'

let { CDN_IMAGE } = process.env;

type Props = {
    guildId: string;
    iconID: string | null;
};

export function GuildIcon({ guildId, iconID }: Props) {

    let uri = `${CDN_IMAGE}/icons/${guildId}/${iconID}.png`;

    return (

        <View style={styles.container}>

            {
                iconID ? 
                <Image
                    source={{ uri }}
                    style={styles.image}
                    resizeMode='cover'
                />
                :
                <DiscordSvg
                    width={40}
                    height={40}
                />
            }

        </View>

    );
};