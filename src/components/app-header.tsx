import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { DrawerMenu } from "@/components/drawer-menu";
import { useTheme } from "@/hooks/use-theme";

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  currentRoute?: string;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
}

export function AppHeader({
  title,
  showBack = false,
  currentRoute = "/",
  rightAction,
}: AppHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      <View style={[styles.headerContainer, { borderBottomColor: theme.backgroundElement }]}>
        <View style={styles.leftSection}>
          {showBack ? (
            <TouchableOpacity
              onPress={() => router.back()}
              style={[styles.iconButton, { backgroundColor: theme.backgroundElement }]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="arrow-back" size={22} color={theme.text} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setDrawerOpen(true)}
              style={[styles.menuButton, { backgroundColor: theme.backgroundElement }]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="menu" size={24} color="#D32F2F" />
            </TouchableOpacity>
          )}

          {title ? (
            <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>
              {title}
            </Text>
          ) : (
            <View style={styles.brandContainer}>
              <Text style={[styles.brandMain, { color: theme.text }]}>DAYTONA</Text>
              <Text style={styles.brandSub}>REPUESTOS</Text>
            </View>
          )}
        </View>

        <View style={styles.rightSection}>
          {/* Si está en una sub-pantalla con botón Atrás, aún permitimos abrir el menú hamburguesa desde la derecha */}
          {showBack && (
            <TouchableOpacity
              onPress={() => setDrawerOpen(true)}
              style={[styles.iconButton, { backgroundColor: theme.backgroundElement }]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="menu" size={22} color="#D32F2F" />
            </TouchableOpacity>
          )}

          {rightAction && (
            <TouchableOpacity
              onPress={rightAction.onPress}
              style={[styles.iconButton, { backgroundColor: theme.backgroundElement }]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name={rightAction.icon} size={20} color={theme.text} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <DrawerMenu
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentRoute={currentRoute}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
  },
  brandMain: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },
  brandSub: {
    fontSize: 12,
    fontWeight: "700",
    color: "#D32F2F",
    letterSpacing: 0.5,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
