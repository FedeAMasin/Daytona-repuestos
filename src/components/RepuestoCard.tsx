import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { Repuesto } from "@/data/repuestos";

interface RepuestoCardProps {
  repuesto: Repuesto;
}

// Componente reutilizable para representar cada repuesto de la aplicación
export function RepuestoCard({ repuesto }: RepuestoCardProps) {
  return (
    <View style={styles.cardContainer}>
      {/* 1. Uso de Image */}
      <Image
        source={{ uri: repuesto.imagen }}
        style={styles.imagen}
        resizeMode="cover"
      />

      {/* 2. Uso de View para estructurar información */}
      <View style={styles.infoContainer}>
        <View style={styles.categoriaBadge}>
          <Text style={styles.categoriaTexto}>{repuesto.categoria}</Text>
        </View>

        {/* 3. Uso de Text para títulos, descripciones y precios */}
        <Text style={styles.nombre}>{repuesto.nombre}</Text>
        <Text style={styles.descripcion}>{repuesto.descripcion}</Text>
        <Text style={styles.precio}>${repuesto.precio.toLocaleString("es-AR")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 3,
  },
  imagen: {
    width: "100%",
    height: 180,
  },
  infoContainer: {
    padding: 14,
  },
  categoriaBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#ffebee",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  categoriaTexto: {
    color: "#d32f2f",
    fontSize: 12,
    fontWeight: "bold",
  },
  nombre: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 6,
  },
  descripcion: {
    fontSize: 14,
    color: "#616161",
    lineHeight: 20,
    marginBottom: 10,
  },
  precio: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32",
  },
});
