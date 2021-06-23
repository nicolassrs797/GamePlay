import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';

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

import { styles } from './styles';
import { Background } from '../../components/Backgorund';
import { theme } from '../../global/styles/theme';
import { Feather } from '@expo/vector-icons';

export function AppointmentCreate() {


    let [category, setCategory] = useState('');

    let [openGuildsModal, setOpenGuildsModal] = useState(false);

    let [guild, setGuild] = useState<GuildProps>({} as GuildProps);

    function handleOpenGuilds() {
        setOpenGuildsModal(true);
    };

    function handleGuildSelect(guildSelected: GuildProps) {
        setOpenGuildsModal(false);
        setGuild(guildSelected);
    };

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView>

                <Background>

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

                                { guild.icon ?  <GuildIcon/> : <View style={styles.image}/>}
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
                                <Text style={styles.label}>
                                    Dia e mês
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput maxLength={2} />
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                    <SmallInput maxLength={2} />
                                </View>
                            </View>

                            <View>
                                <Text style={styles.label}>
                                    Hora e minuto
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput maxLength={2} />
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput maxLength={2} />
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
                        />
                    </View>

                    <View style={styles.button}>
                        <Button title="Agendar"/>
                    </View>
                    
                </Background>

            </ScrollView>

            <ModalView visible={openGuildsModal}>
                <Guilds handleGuildSelect={handleGuildSelect}/>
            </ModalView>

        </KeyboardAvoidingView>
    )
};