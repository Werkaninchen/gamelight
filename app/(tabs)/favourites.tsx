import { Image, StyleSheet, Platform, FlatList, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { create } from "zustand";
import { useGameStore } from "../local/game_store";
import { useEffect } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function HomeScreen() {
  const getGames = useGameStore((state) => state.fetchGames);
  const likeGame = useGameStore((state) => state.likeGame);
  const articles = useGameStore((state) => state.games);
  const status = useGameStore((state) => state.state);

  useEffect(() => {
    getGames();
  }, []);

  return (
    <FlatList
      data={articles.filter((game) => game.liked)}
      renderItem={({ item }) => (
        <ThemedView style={styles.stepContainer}>
          <ThemedView style={styles.titleContainer}>
            <Image src={item.iconURL} style={styles.icon} />
            <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle">{item.title}</ThemedText>
              <ThemedText>{"Rating: " + item.rating}</ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.titleContainer}>
            <Button title="Details" onPress={() => console.log("Details")} />
            <ThemedView>
              <TabBarIcon
                style={{ alignSelf: "flex-end" }}
                name="heart"
                color={item.liked ? "red" : "black"}
                onPress={() => likeGame(item.id)}
              />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      )}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 5,
    borderColor: "#000000",
    borderWidth: 1,
  },
  stepContainer: {
    gap: 8,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
