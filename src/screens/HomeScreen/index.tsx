import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Backgorund';
import { Loading } from '../../components/Loading';


import { styles } from './style';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

export function Home() {

    let [category, setCategory] = useState('');

    let navigation = useNavigation();

    let [appointments, setAppointments] = useState<AppointmentProps[]>([]);

    let [loading, setLoading] = useState(true);
    
    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    };

    function handleAppointmentDetails(guildSelected: AppointmentProps){
        navigation.navigate('AppointmentDetails', {guildSelected});
    };

    function handleAppointmentCreate(){
        navigation.navigate('AppointmentCreate');
    };

    async function loadAppointments() {
        let response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        let storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if(category){
            setAppointments(storage.filter(item => item.category === category));
        } else {
            setAppointments(storage);
        };

        setLoading(false);
    };

    useFocusEffect(useCallback(() => {
        loadAppointments();
    },[category]));

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd 
                    onPress={handleAppointmentCreate}
                />
            </View>

            <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect}
            />

            {
                loading ? <Loading/> :
                <>
                    <View style={styles.content}>

                        <ListHeader
                            title="Partidas agendadas"
                            subtitle={`Total ${appointments.length}`}
                        />

                    </View>

                    <FlatList
                    data={appointments}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                    <Appointment
                        data={item} 
                        onPress={() => handleAppointmentDetails(item)}
                    />
                    )}
                    ItemSeparatorComponent={() => <ListDivider isCentered/>}
                    style={ styles.matches }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 69 }}
                    />
                </>
            }
        </Background>
    );
};