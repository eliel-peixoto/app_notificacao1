import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const UserRegisterScreen = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <View>
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
        </View>
    );
}

export default UserRegisterScreen;