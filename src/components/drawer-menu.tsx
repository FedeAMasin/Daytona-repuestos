import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/hooks/use-theme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.78, 320);

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
  currentRoute?: string;
}

interface MenuItem {
  title: string;
  subtitle: string;
  route: string;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    title: "Inicio",
    subtitle: "Pantalla principal y accesos directos",
    route: "/",
  },
  {
    title: "Catálogo",
    subtitle: "Repuestos, autopartes y accesorios",
    route: "/catalogo",
  },
  {
    title: "Asistencia Técnica",
    subtitle: "Turnos, diagnósticos y asesoría",
    route: "/asistencia",
  },
  {
    title: "Soporte",
    subtitle: "Atención al cliente, WhatsApp y FAQ",
    route: "/soporte",
  },
];

export function DrawerMenu({
  visible,
  onClose,
  currentRoute = "/",
}: DrawerMenuProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();

  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleNavigate = (route: string) => {
    onClose();
    if (currentRoute !== route) {
      setTimeout(() => {
        router.push(route as any);
      }, 150);
    }
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlayContainer}>
        {/* Fondo oscuro traslúcido */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            style={[
              styles.backdrop,
              {
                opacity: fadeAnim,
              },
            ]}
          />
        </TouchableWithoutFeedback>

        {/* Panel lateral deslizante */}
        <Animated.View
          style={[
            styles.drawerContent,
            {
              width: DRAWER_WIDTH,
              backgroundColor: theme.background,
              paddingTop: Math.max(insets.top, 24),
              paddingBottom: Math.max(insets.bottom, 16),
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {/* Cabecera del Menú */}
          <View style={styles.drawerHeader}>
            <View style={styles.brandRow}>
              <View style={styles.logoBadge}>
                <Ionicons name="speedometer" size={24} color="#ffffff" />
              </View>
              <View style={styles.brandTexts}>
                <Text style={[styles.brandTitle, { color: theme.text }]}>
                  DAYTONA
                </Text>
                <Text style={styles.brandSubtitle}>REPUESTOS & SERVICIOS</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={onClose}
              style={[
                styles.closeButton,
                { backgroundColor: theme.backgroundElement },
              ]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={20} color={theme.text} />
            </TouchableOpacity>
          </View>

          {/* Línea divisoria */}
          <View
            style={[
              styles.divider,
              { backgroundColor: theme.backgroundElement },
            ]}
          />

          {/* Opciones de Navegación */}
          <View style={styles.menuList}>
            <Text style={styles.sectionLabel}>MENÚ PRINCIPAL</Text>

            {MENU_ITEMS.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <Pressable
                  key={item.route}
                  onPress={() => handleNavigate(item.route)}
                  style={({ pressed }) => [
                    styles.menuItem,
                    isActive && styles.menuItemActive,
                    pressed && { opacity: 0.8 },
                  ]}
                >
                  <View style={styles.menuTextContainer}>
                    <View style={styles.titleRow}>
                      <Text
                        style={[
                          styles.menuTitle,
                          { color: isActive ? "#D32F2F" : theme.text },
                          isActive && styles.menuTitleActive,
                        ]}
                      >
                        {item.title}
                      </Text>
                      {item.badge && (
                        <View style={styles.badge}>
                          <Text style={styles.badgeText}>{item.badge}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={isActive ? "#D32F2F" : "#9E9E9E"}
                  />
                </Pressable>
              );
            })}
          </View>

          {/* Pie del Drawer */}
          <View style={styles.drawerFooter}>
            <View
              style={[
                styles.infoCard,
                { backgroundColor: theme.backgroundElement },
              ]}
            >
              <View style={styles.infoRow}>
                <Ionicons name="call" size={16} color="#D32F2F" />
                <Text style={[styles.infoText, { color: theme.text }]}>
                  Atención: 0800-888-DAYTONA
                </Text>
              </View>
              <Text style={styles.subInfoText}>
                Lun a Vie: 08:00 - 18:00 hs
              </Text>
            </View>

            <Text style={styles.versionText}>
              Versión 1.0.0 • Daytona Motors
            </Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    flexDirection: "row",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  drawerContent: {
    height: "100%",
    elevation: 16,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    justifyContent: "space-between",
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#D32F2F",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  brandTexts: {
    flexDirection: "column",
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  brandSubtitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#D32F2F",
    letterSpacing: 0.8,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  menuList: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#888888",
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 8,
  },
  menuItemActive: {
    backgroundColor: "rgba(211, 47, 47, 0.08)",
  },
  menuTextContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  menuTitleActive: {
    fontWeight: "700",
  },
  badge: {
    backgroundColor: "#D32F2F",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  menuSubtitle: {
    fontSize: 11,
    color: "#888888",
    marginTop: 2,
  },
  drawerFooter: {
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  infoCard: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    fontWeight: "700",
  },
  subInfoText: {
    fontSize: 11,
    color: "#888888",
    marginLeft: 24,
  },
  versionText: {
    textAlign: "center",
    fontSize: 11,
    color: "#999999",
  },
});
