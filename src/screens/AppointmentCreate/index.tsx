import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { RectButton } from 'react-native-gesture-handler';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

import { styles } from './styles';
import { Background } from '../../components/Backgorund';
import { theme } from '../../global/styles/theme';
import { Feather } from '@expo/vector-icons';

export function AppointmentCreate() {


    let [category, setCategory] = useState('');

    let [openGuildsModal, setOpenGuildsModal] = useState(false);

    let [guild, setGuild] = useState<GuildProps>({} as GuildProps);

    let [day, setDay] = useState('');
    let [month, setMonth] = useState('');
    let [hour, setHour] = useState('');
    let [minute, setMinute] = useState('');
    let [description, setDescription] = useState('');

    let navigation = useNavigation();

    function handleOpenGuilds() {
        setOpenGuildsModal(true);
    };

    function handleCloseGuilds() {
        setOpenGuildsModal(false);
    };

    function handleGuildSelect(guildSelected: GuildProps) {
        setOpenGuildsModal(false);
        setGuild(guildSelected);
    };

    function handleCategorySelect(categoryId: string) {
        setCategory(categoryId);
    };

    async function handleSave() {
        let newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description
        };

        let storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        let appointments = storage ? JSON.parse(storage) : [];
        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointments, newAppointment])
        );

        navigation.navigate('Home');
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Background>
                <ScrollView>


                    <Header
                        title="Agendar Partida"
                    />

                    <View style={styles.categoryTitle}>
                        <ListHeader title="Categoria" subtitle=""/>
                    </View>

                    <CategorySelect
                        categorySelected={category}
                        setCategory={handleCategorySelect}
                        hasCheckbox
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>

                                { guild.icon ?  <GuildIcon guildId={guild.id} iconID={guild.icon}/> : <View style={styles.image}/>}
                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        { guild.name ? guild.name : 'Selecione um servidor'}
                                    </Text>
                                </View>

                                <Feather
                                    name="chevron-right"
                                    color={theme.colors.heading}
                                    size={18}
                                />

                            </View>
                        </RectButton>
                        
                        <View style={styles.field}>

                            <View>
                                <Text style={[styles.label, { marginBottom: 12}]}>
                                    Dia e mês
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setDay}
                                    />
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setMonth}
                                    />
                                </View>
                            </View>

                            <View>
                                <Text style={[styles.label, { marginBottom: 12}]}>
                                    Hora e minuto
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setHour}
                                    />
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setMinute}
                                    />
                                </View>
                            </View>
                                
                        </View>

                    </View>


                    <View style={styles.textAreaTitle}>
                        <ListHeader title="Descrição" subtitle="Max 100 caracteres"/>
                    </View>
                    <View style={styles.textArea}>
                        <TextArea
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                            onChangeText={setDescription}
                        />
                    </View>

                    <View style={styles.button}>
                        <Button
                            title="Agendar"
                            onPress={handleSave}
                        />
                    </View>
                    
                </ScrollView>
            </Background>


            <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
                <Guilds handleGuildSelect={handleGuildSelect}/>
            </ModalView>

        </KeyboardAvoidingView>
    )
};