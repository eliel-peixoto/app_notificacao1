import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const UserCard = ({ usuario, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cartao}>
      <Text style={styles.nome}>{usuario.nome}</Text>
      <Text style={styles.email}>{usuario.email}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: '#eee',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    color: '#666',
    fontSize: 14,
  },
  telefone: {
    color: '#555',
    fontSize: 14,
  },
});

export default UserCard;