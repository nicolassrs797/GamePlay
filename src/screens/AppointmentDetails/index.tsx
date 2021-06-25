import React, {useState, useEffect} from 'react';
import { View, ImageBackground, Text, FlatList, Alert, Platform } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcons';
import { AppointmentProps } from '../../components/Appointment';
import { Loading } from '../../components/Loading';

import { Background } from '../../components/Backgorund';
import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png';
import { Fontisto } from '@expo/vector-icons';
import { api } from '../../services/api';
import { styles } from './styles';
import { Share } from 'react-native';

type Params = {
    guildSelected: AppointmentProps,
};

type GuildWidget = {
    id: string,
    name: string,
    instant_invite: string,
    members: MemberProps[],
};

export function AppointmentDetails() {

    let route = useRoute();
    let { guildSelected } = route.params as Params;
    let [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    let [loading, setLoading] = useState(true);

    async function fetchGuildWidget() {
        try {
            
            let response = await api.get(`guilds/${guildSelected.guild.id}/widget.json`);

            setWidget(response.data);

        } catch (error) {
            Alert.alert('Oops! Verifique as configurações do servidor! Será que o Widget está habilitado?');
            widget={ } as GuildWidget;
        } finally{
            setLoading(false);
        };
    };

    function handleShareInvite(){
        let message = Platform.OS === 'ios' ? `Junte-se a ${guildSelected.guild.name}` : widget.instant_invite;

        Share.share({
            message,
            url: widget.instant_invite
        })
    };

    function handleOpenGuild(){
        Linking.openURL(widget.instant_invite);
    };

    useEffect(() => {
        fetchGuildWidget();
    },[])

    return (
        <Background>

            <Header
                title="Detalhes"
                action={<>
                        {
                            loading ? <Loading/> : 
                            widget.instant_invite ? 
                            <BorderlessButton>
                                <Fontisto
                                    name="share"
                                    size={24}
                                    color={theme.colors.primary}
                                    onPress={handleShareInvite}
                                />
                            </BorderlessButton>
                             :
                            <View style={{width: 24}}/>
                        }
                        </>
                }
            /> 
            
            <ImageBackground 
                source={BannerImg}
                style={styles.banner}
            >
                <Text style={styles.title}>
                    {guildSelected.guild.name}
                </Text>

                <Text style={styles.subtitle}>
                    {guildSelected.description}
                </Text>

            </ImageBackground>

            {
                loading ? <Loading/> :
                widget.instant_invite ? 
                <>
                    <ListHeader title="Jogadores" subtitle={`Total ${widget.members.length}`} />

                    <FlatList
                        data={widget.members}
                        style={styles.members}
                        keyExtractor={item => item.id}
                        renderItem={( {item} ) => (
                            <Member data={item} />
                        )}
                        ItemSeparatorComponent={() => <ListDivider isCentered/>}
                    />

                    <View style={styles.footer}>
                        <ButtonIcon 
                            title="Entrar na partida"
                            onPress={handleOpenGuild}
                        />
                    </View>
                </> : <></>
            }

        </Background>
    )
};