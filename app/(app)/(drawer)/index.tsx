import { useSession } from "@/context";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import NewCardModal from "@/components/forms/new-card";
import CardList from "../../../components/cards/card-list";
import SearchBar from "../../../components/search-bar";

const HomeScreen = () => {
  const [blurred, setBlurred] = useState(false);
  //get the user document/data
  const { userDoc, cards, addCard } = useSession();
  const [editingMode, setEditingMode] = useState(false);
  const [newCardMode, setNewCardMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const size = 42;
  const color = "#59168B";

  const filteredAndSortedCards = React.useMemo(() => {
    return [...(cards || [])]
      .filter(
        (card) => card.title.toLowerCase().includes(searchQuery.toLowerCase()),
        // || card.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      );
  }, [cards, searchQuery]);

  return (
    <View className="flex-1 px-4 pt-2 bg-white">
      {/* NEEDS IMPLEMENTED */}
      <SearchBar query={searchQuery} onSearch={setSearchQuery} />

      <CardList
        onExpand={() => setBlurred(true)}
        onClose={() => setBlurred(false)}
        cards={filteredAndSortedCards}
      />

      <View className="absolute inset-3 justify-end px-6 pb-6">
        <View className="flex-row justify-between">
          {/* add a card */}
          <Pressable
            className=" bg-white p-2 rounded-full shadow-slate-100"
            onPress={() => setNewCardMode(true)}
          >
            <MaterialIcons name="add" size={size} color={color} />
          </Pressable>

          {/* enter edit mode: this should allow you to delete or edit individual cards */}
          <Pressable className="bg-white p-2 rounded-full shadow-slate-100">
            <MaterialIcons name="create" size={size} color={color} />
          </Pressable>
        </View>
      </View>

      <NewCardModal
        visible={newCardMode}
        onClose={() => setNewCardMode(false)}
        onSubmit={addCard}
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
