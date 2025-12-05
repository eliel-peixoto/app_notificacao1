import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import api from '../services/api';

const UserRegisterScreen = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSave = async () => {
        try {
            await api.post('/usuarios', {nome, email, senha})
            navigation.goback();
        } catch (error){
            console.error('Erro ao cadastrar usuário', error)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />

            <Button title='Cadastrar' onPress={handleSave}></Button>
        </View>
    );
}

const styles = StyleSheet.create({

})

export default UserRegisterScreen;