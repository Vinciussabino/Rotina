import React, {
  useState,
  useContext,
} from "react";

import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import ThemeContext from "../context/ThemeContext";
import { supabase } from "../services/supabase";

import styles from "../../styles";

export default function LoginScreen({
  navigation,
}) {
  const { theme } =
    useContext(ThemeContext);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  async function handleLogin() {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    const { error } =
      await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

    if (error) {
      alert("Email ou senha inválidos");
      return;
    }

    navigation.replace("Tabs");
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >
      <Image
        source={require("../../assets/LogoRotina2.png")}
        style={{
          width: 250,
          height: 250,
          resizeMode: "contain",
          alignSelf: "center",
          marginTop: -100,
        }}
      />

      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          fontWeight: "bold",
          color: theme.text,
          marginBottom: 20,
        }}
      >
        Login
      </Text>

      <TextInput
        placeholder="alan.turing@exemplo.com"
        placeholderTextColor={
          theme.subtitle
        }
        style={[
          styles.input,
          {
            backgroundColor:
              theme.card,
            color: theme.text,
            borderColor:
              theme.subtitle,
          },
        ]}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <View
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <TextInput
          placeholder="Senha"
          placeholderTextColor={
            theme.subtitle
          }
          style={[
            styles.input,
            {
              backgroundColor:
                theme.card,
              color: theme.text,
              borderColor:
                theme.subtitle,
              paddingRight: 50,
            },
          ]}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={() =>
            setShowPassword(
              !showPassword
            )
          }
          style={{
            position: "absolute",
            right: 15,
            top: 18,
          }}
        >
          <Feather
            name={
              showPassword
                ? "eye-off"
                : "eye"
            }
            size={22}
            color={theme.text}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              theme.primary,
          },
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Register"
          )
        }
      >
        <Text
          style={[
            styles.link,
            {
              color: theme.text,
            },
          ]}
        >
          Não tem conta?{" "}
          <Text
            style={{
              color: theme.primary,
              fontWeight: "bold",
            }}
          >
            Cadastre-se
          </Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}