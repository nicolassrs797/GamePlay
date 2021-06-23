import React from 'react';
import { View, ImageBackground, Text, FlatList } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcons';

import { styles } from './styles';
import { Background } from '../../components/Backgorund';
import { Fontisto } from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png';

export function AppointmentDetails() {

    let members = [
        {
            id: '1',
            username: 'Teixeira',
            avatar_url: 'https://scontent.fgyn22-1.fna.fbcdn.net/v/t1.6435-9/174539829_3668147673295450_7966367934281302858_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeG2EPpB0uuYMC9D_J2bh2btAdcHTdrFGbkB1wdN2sUZuRH8vUgSVSTYgBrFVr-49U7w5X13TLcfJif3fRB-PtZt&_nc_ohc=ws5ie0OZvxgAX_DYz_k&_nc_ht=scontent.fgyn22-1.fna&oh=56923a3a0a66eae5896dcdbde65a7a69&oe=60D93B17',
            status: 'online'
        },
        {
            id: '2',
            username: 'Marinho',
            avatar_url: 'https://scontent.fgyn22-1.fna.fbcdn.net/v/t1.6435-9/46334726_1415544285244663_4881238986263101440_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeHJ3YJKBc67ZiphRPuwXPvKQ8YonidUSylDxiieJ1RLKQgT8Gz05mqKrr0qfBsXUORO_ElT_zSMVj_zAVP3cSGH&_nc_ohc=NRJYFht1jwoAX9wxnPl&_nc_ht=scontent.fgyn22-1.fna&oh=2731500adc904b127c6ac75932ceea21&oe=60D7D720',
            status: 'offline'
        },
        {
            id: '3',
            username: 'França',
            avatar_url: 'https://scontent.fgyn22-1.fna.fbcdn.net/v/t31.18172-8/13710689_1258141047544011_464059006515415674_o.jpg?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeERtwbyU245m6gaJEPkO4_nJbaYgZwUQ6AltpiBnBRDoJEGCansVUWR9vvmHZCWBIYL9drCb7zWyaauMTyXnYJy&_nc_ohc=ZXtKFB_GKwgAX8GU2X2&_nc_ht=scontent.fgyn22-1.fna&oh=662761d36a33e3922ea0beff754bec38&oe=60D95DE6',
            status: 'offline'
        }, 
        
    ]

    return (
        <Background>

            <Header
                title="Detalhes"
                action={
                    <BorderlessButton>

                        <Fontisto
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                        />

                    </BorderlessButton>
                }
            /> 
            
            <ImageBackground 
                source={BannerImg}
                style={styles.banner}
            >
                <Text style={styles.title}>
                    Lendários
                </Text>

                <Text style={styles.subtitle}>
                    É hoje que vamos chegar ao challenger sem perder uma partida da md10
                </Text>

            </ImageBackground>

            <ListHeader title="Jogadores" subtitle="total 3" />

            <FlatList
                data={members}
                style={styles.members}
                keyExtractor={item => item.id}
                renderItem={( {item} ) => (
                    <Member data={item} />
                )}
                ItemSeparatorComponent={() => <ListDivider/>}
            />
            
            <View style={styles.footer}>
                <ButtonIcon title="Entrar na partida"/>
            </View>

        </Background>
    )
};