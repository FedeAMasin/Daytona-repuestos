import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface HeaderProps {
  titulo: string;
  subtitulo: string;
}

// Componente reutilizable de encabezado que recibe datos por props
export function Header({ titulo, subtitulo }: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("@/assets/images/icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.textoContainer}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.subtitulo}>{subtitulo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 12,
  },
  textoContainer: {
    flex: 1,
  },
  titulo: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#b0bec5",
    fontSize: 13,
  },
});
