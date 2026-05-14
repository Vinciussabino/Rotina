import React, { useState, useEffect, useCallback, useContext } from "react";

import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { Feather } from "@expo/vector-icons";
import ThemeContext from "../context/ThemeContext";
import { supabase } from "../services/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../../styles";

export default function HomeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchTasks();
      }
    }, [user]),
  );

  async function getUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  }

  async function fetchTasks() {
    if (!user) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) return;

    setTasks(data);
  }

  function toggleTask(id) {
    if (completedTasks.includes(id)) {
      setCompletedTasks(completedTasks.filter((taskId) => taskId !== id));
    } else {
      setCompletedTasks([...completedTasks, id]);
    }
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
        ROTINA
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: theme.subtitle,
          },
        ]}
      >
        Tarefas:
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        style={{
          marginTop: 20,
          width: "100%",
        }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: theme.card,
              padding: 15,
              marginBottom: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => toggleTask(item.id)}
              style={{
                marginRight: 12,
              }}
            >
              <Feather
                name={
                  completedTasks.includes(item.id) ? "check-square" : "square"
                }
                size={22}
                color={theme.text}
              />
            </TouchableOpacity>

            <Text
              style={{
                color: theme.text,
                fontSize: 16,
                flex: 1,
                textDecorationLine: completedTasks.includes(item.id)
                  ? "line-through"
                  : "none",
                opacity: completedTasks.includes(item.id) ? 0.5 : 1,
              }}
            >
              {item.text}
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Tasks", {
                  task: item,
                })
              }
            >
              <Feather name="edit-2" size={20} color={theme.text} />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Tasks")}
        style={{
          position: "absolute",
          bottom: 90,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: theme.primary,
          justifyContent: "center",
          alignItems: "center",
          elevation: 5,
        }}
      >
        <Feather name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
