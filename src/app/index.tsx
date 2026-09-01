import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/Header";
import { RepuestoCard } from "@/components/RepuestoCard";
import { REPUESTOS } from "@/data/repuestos";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Componente Reutilizable 1: Header (recibe props) */}
      <Header
        titulo="Daytona Repuestos"
        subtitulo="Catálogo Oficial de Autopartes"
      />

      {/* Uso de ScrollView para desplazamiento vertical */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner con View, Text e Image */}
        <View style={styles.bannerContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
            }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerTextOverlay}>
            <Text style={styles.bannerTitulo}>Repuestos con Garantía</Text>
            <Text style={styles.bannerSubtitulo}>
              Encontrá las mejores piezas para el mantenimiento de tu vehículo.
            </Text>
          </View>
        </View>

        {/* Título de la sección */}
        <View style={styles.seccionHeader}>
          <Text style={styles.seccionTitulo}>Productos Disponibles</Text>
          <Text style={styles.seccionSubtitulo}>
            Listado actualizado con stock inmediato
          </Text>
        </View>

        {/* Mapeo de datos estáticos y comunicación mediante props con componente reutilizable */}
        {REPUESTOS.map((item) => (
          <RepuestoCard key={item.id} repuesto={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  bannerContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    elevation: 4,
  },
  bannerImage: {
    width: "100%",
    height: 150,
    opacity: 0.75,
  },
  bannerTextOverlay: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
  },
  bannerTitulo: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  bannerSubtitulo: {
    color: "#e0e0e0",
    fontSize: 13,
    marginTop: 4,
  },
  seccionHeader: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212121",
  },
  seccionSubtitulo: {
    fontSize: 13,
    color: "#757575",
    marginTop: 2,
  },
});
