import { useSession } from "@/context";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import CardList from "../../../components/cards/card-list";
import SearchBar from "../../../components/search-bar";

const HomeScreen = () => {
  const [blurred, setBlurred] = useState(false);
  //get the user document/data
  const { userDoc, cards } = useSession();
  const [editingMode, setEditingMode] = useState(false);
  const size = 32;
  const color = "#59168B";

  return (
    <View className="flex-1 px-4 pt-2 bg-white">
      <View className="flex-row justify-between items-center px-2 py-4">
        {/* add a card */}
        <Pressable>
          <MaterialIcons name="add-circle" size={size} color={color} />
        </Pressable>
        {/* This would be cool to move here - need to work on spacing */}
        {/* <Image
          className="w-36 h-auto"
          source={require("../../../assets/images/silent_speak_long_logo.png")}
          resizeMode="contain"
        /> */}
        {/* enter edit mode: this should allow you to delete or edit individual cards */}
        <Pressable>
          <MaterialIcons name="create" size={size} color={color} />
        </Pressable>
      </View>
      {/* NEEDS IMPLEMENTED */}
      <SearchBar />
      <CardList
        onExpand={() => setBlurred(true)}
        onClose={() => setBlurred(false)}
        cards={cards}
      />

      {blurred && (
        <BlurView
          intensity={40}
          tint="dark"
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </View>
  );
};

const fetchData = async () => {};

export default HomeScreen;
