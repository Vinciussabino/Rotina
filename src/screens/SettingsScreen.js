import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import ThemeContext from "../context/ThemeContext";
import { supabase } from "../services/supabase";
import styles from "../../styles";

export default function SettingsScreen({ navigation }) {
  const { theme, isDark, setIsDark } = useContext(ThemeContext);

  async function handleLogout() {
    await supabase.auth.signOut();

    navigation.replace("Login");
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: theme.text,
            marginBottom: 60,
          },
        ]}
      >
        Configurações
      </Text>

      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: theme.card,
          padding: 18,
          borderRadius: 12,
          marginBottom: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => setIsDark(!isDark)}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Feather
            name={isDark ? "moon" : "sun"}
            size={22}
            color={theme.text}
          />

          <Text
            style={{
              color: theme.text,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {isDark ? "Tema escuro" : "Tema claro"}
          </Text>
        </View>

        <Feather name="chevron-right" size={20} color={theme.subtitle} />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "#ff3b30",
          padding: 18,
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
        onPress={handleLogout}
      >
        <Feather name="log-out" size={20} color="#fff" />

        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Sair da conta
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
