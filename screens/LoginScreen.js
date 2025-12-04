import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import api from '../services/api';
import { registerForPushNotificationsAsync } from '../notifications/notifications';

const LoginScreen = ({navigation}) => {

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        if (login && senha){
            try{
                const response = await api.get('/usuarios', {params: {email: login, senha: senha}});

                const usuarioEncontrado = response.data[0];

                if (usuarioEncontrado){

                    const token = await registerForPushNotificationsAsync();

                    if (token) {
                        await api.patch(`/usuarios/${usuarioEncontrado.id}`, {
                            expoPushToken: token
                        });
                    }


                    navigation.navigate('Home', {
                        usuario: {
                            ...usuarioEncontrado,
                            expoPushToken: token
                        }
                    });

                }else{
                    alert('Usuário ou senha inválidos')
                }
                /*if (response.data.length > 0) {
                    navigation.navigate('Home');
                }else{
                    alert('Usuário ou senha inválidos');
                }*/
            }catch (error){
                console.error('Usuário não encontrado', error);
            }
        }else{
            alert('Tentativa inválida, preencha todos os campos');
        }

    }

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <TextInput style={styles.input} value={login} onChangeText={setLogin}></TextInput>
            <Text>Senha</Text>
            <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry></TextInput>
            <Button type='solid' title={'Login'} buttonStyle={{backgroundColor: 'blue', padding: 10, marginTop: 20}} onPress={handleLogin}></Button>
            <Button type='solid' title={'Cadastre-se'} buttonStyle={{backgroundColor: 'darkgreen', padding: 10, marginTop: 20}} onPress={() => navigation.navigate('Usuário')}></Button>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    input:{
        borderColor: 'black',
        borderWidth: 2,
        width: 250,
    }

},

)

export default LoginScreen;