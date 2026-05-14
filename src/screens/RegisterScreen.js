import React, { useState, useContext } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import ThemeContext from "../context/ThemeContext";
import { supabase } from "../services/supabase";
import styles from "../../styles";

export default function RegisterScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Conta criada com sucesso!");

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
          },
        ]}
      >
        Cadastro
      </Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor={theme.subtitle}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.subtitle,
          },
        ]}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor={theme.subtitle}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.subtitle,
          },
        ]}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <TextInput
          placeholder="Senha"
          placeholderTextColor={theme.subtitle}
          style={[
            styles.input,
            {
              backgroundColor: theme.card,
              color: theme.text,
              borderColor: theme.subtitle,
              paddingRight: 50,
            },
          ]}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: 15,
            top: 18,
          }}
        >
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color={theme.text}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme.primary,
          },
        ]}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text
          style={[
            styles.link,
            {
              color: theme.text,
            },
          ]}
        >
          Já tem conta?{" "}
          <Text
            style={{
              color: theme.primary,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
