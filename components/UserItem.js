import React, { useState } from "react";
import { View, Text, Modal, TextInput, Button, StyleSheet } from "react-native";

export default function UserItem({ user, onClose }) {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");

  const enviarNotificacao = async () => {
    if (!user.expoPushToken) {
      alert("Este usuário não possui Expo Push Token salvo.");
      return;
    }

    // CHAMADA EXPO PUSH API
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Host: "exp.host",
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: user.expoPushToken,
        title: titulo || "Notificação",
        body: mensagem,
      }),
    });

    alert("Notificação enviada!");
    setTitulo("");
    setMensagem("");
    onClose();
  };

  return (
    <Modal visible={true} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          
          <Text style={styles.title}>
            Notificação para {user.nome}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Título da notificação"
            value={titulo}
            onChangeText={setTitulo}
          />

          <TextInput
            style={styles.input}
            placeholder="Mensagem"
            value={mensagem}
            onChangeText={setMensagem}
          />

          <Button title="Enviar" onPress={enviarNotificacao} />
          <Button title="Fechar" color="red" onPress={onClose} />

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
});
