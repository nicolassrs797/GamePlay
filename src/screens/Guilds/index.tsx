import React from 'react';
import { View, FlatList } from 'react-native';

import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './style';

type Props = {
    handleGuildSelect: (guild: GuildProps) => void
};

export function Guilds({handleGuildSelect}: Props) {

    let guilds = [
        {
            id: '1',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },
        {
            id: '2',
            name: 'Lendários',
            icon: 'image.png',
            owner: false
        },
    ];

    return (
        <View style={styles.container}>
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
        </View>
    );
};