import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import UserCard from '../components/UserCard';
import api from '../services/api';

const HomeScreen = ({navigation}) => {
    const [usuarios, setUsuarios] = useState([]);

    const fetchUsuarios = async () => {
        try {
            const response = await api.get('/usuarios');
            setUsuarios(response.data);
        }catch (error){
            console.error('Erro ao consultar usuarios:', error);
        }
    };
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchUsuarios);
        return unsubscribe;
    }, [navigation]);

    const handlePress = (usuario) => {
        navigation.navigate('Alteracao', {usuario})
        // alterar dps para abrir o modal
    };

    return (
        <View style={styles.container}>
            <FlatList style={{ flex: 1, width: '100%'}} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }} data={usuarios} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => (
                //<Text style={{ fontSize: 18, padding: 10 }}>{item.nome}</Text>
                <UserCard usuario={item} onPress={() => handlePress(item)}/>
            )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 16,
        backgroundColor: '#fff',
    },

})

export default HomeScreen;