import React, { useState, useContext } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { supabase } from "../services/supabase";
import ThemeContext from "../context/ThemeContext";
import styles from "../../styles";

export default function TasksScreen({ route, navigation }) {
  const { theme } = useContext(ThemeContext);

  const { task } = route.params || {};

  const [text, setText] = useState(task ? task.text : "");

  async function handleSave() {
    const { data } = await supabase.auth.getUser();

    const user = data.user;

    if (!text.trim() || !user) {
      alert("Digite uma tarefa");
      return;
    }

    if (task) {
      const { error } = await supabase
        .from("tasks")
        .update({ text })
        .eq("id", task.id);

      if (error) {
        alert("Erro ao atualizar tarefa");
        return;
      }

      alert("Tarefa atualizada");
    } else {
      const { error } = await supabase.from("tasks").insert([
        {
          text,
          user_id: user.id,
        },
      ]);

      if (error) {
        alert("Erro ao criar tarefa");
        return;
      }

      alert("Tarefa criada");
    }

    navigation.goBack();
  }

  async function handleDelete() {
    if (!task) return;

    const { error } = await supabase.from("tasks").delete().eq("id", task.id);

    if (error) {
      alert("Erro ao excluir tarefa");
      return;
    }

    alert("Tarefa excluída");

    navigation.goBack();
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
        {task ? "Editar tarefa" : "Nova tarefa"}
      </Text>

      <TextInput
        placeholder="Digite a tarefa"
        placeholderTextColor={theme.subtitle}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.subtitle,
          },
        ]}
        value={text}
        onChangeText={setText}
      />

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={[
            styles.button,
            {
              flex: 1,
              backgroundColor: theme.primary,
            },
          ]}
          onPress={handleSave}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Feather name="save" size={18} color="#fff" />

            <Text style={styles.buttonText}>Salvar</Text>
          </View>
        </TouchableOpacity>

        {task && (
          <TouchableOpacity
            style={[
              styles.button,
              {
                flex: 1,
                backgroundColor: "#ff3b30",
              },
            ]}
            onPress={handleDelete}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Feather name="trash-2" size={18} color="#fff" />

              <Text style={styles.buttonText}>Excluir</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
