import { Image, StyleSheet, Platform, FlatList, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { create } from "zustand";
import { useGameStore } from "../local/game_store";
import { useEffect } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useDetailStore } from "../local/detail_store";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const getDetails = useDetailStore((state) => state.fetchDetails);
  const details = useDetailStore((state) => state.details);
  const likeGame = useGameStore((state) => state.likeGame);
  const resetDetails = useDetailStore((state) => state.resetDetails);

  const params = useRoute().params as { id: number };

  const item = useGameStore((state) => state.games).filter(
    (game) => game.id === params?.id
  )[0];

  useEffect(() => {
    getDetails(params?.id);
    return () => resetDetails();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#ececec", dark: "#3c3c3b" }}
      headerImage={
        <Image
          source={{ uri: details.bannerURL }}
          style={{ width: "100%", height: "100%" }}
        />
      }
    >
      <ThemedView
        style={{
          flexDirection: "column",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <ThemedView style={{ flexDirection: "row", gap: 8 }}>
          <Image src={details.iconURL} style={styles.icon} />
          <ThemedView
            style={{
              flexDirection: "column",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <ThemedView style={{ flexDirection: "row", gap: 8 }}>
              <ThemedText type="title">{details.title}</ThemedText>

              <Ionicons
                size={28}
                style={{ alignSelf: "flex-start" }}
                name="heart"
                color={item?.liked ? "red" : "black"}
                onPress={() => likeGame(item?.id)}
              />
            </ThemedView>
            <ThemedText style={{ textAlign: "left" }}>
              {"Rating: " + details.rating}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedText style={{ textAlign: "justify" }}>
          {details.description}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
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
