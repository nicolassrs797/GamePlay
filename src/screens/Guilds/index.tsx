import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';

import { api } from '../../services/api';
import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Loading } from '../../components/Loading';

import { styles } from './style';

type Props = {
    handleGuildSelect: (guild: GuildProps) => void
};

export function Guilds({handleGuildSelect}: Props) {

    let [guilds, setGuilds] = useState<GuildProps[]>([]);
    let [loading, setLoading] = useState(true);

    async function fetchGuilds(){
        let response = await api.get('users/@me/guilds');

        setGuilds(response.data);
        setLoading(false)
    };

    useEffect(() => {
        fetchGuilds();
    },[]);

    return (
        <View style={styles.container}>
            {
                loading ? <Loading/> :
                <FlatList
                    data={guilds}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Guild 
                            data={item} 
                            onPress={() => handleGuildSelect(item)}
                        />
                    )}
                    ItemSeparatorComponent={() => <ListDivider isCentered/>}
                    showsHorizontalScrollIndicator={false}
                    style={styles.guilds}
                    contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
                    ListHeaderComponent={()=> <ListDivider isCentered/>}
                />
            }
        </View>
    );
};