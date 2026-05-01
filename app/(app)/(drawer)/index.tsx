import NewCardModal from "@/components/forms/new-card";
import { useSession } from "@/context";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import CardList from "../../../components/cards/card-list";
import ExpandedCardOverlay from "../../../components/cards/expanded-card";
import SearchBar from "../../../components/search-bar";

const MAX_WIDTH = 680;

const HomeScreen = () => {
  const [blurred, setBlurred] = useState(false);
  const [activeCard, setActiveCard] = useState<any | null>(null);
  const { cards, addCard, palette, modePalette } = useSession();
  const [editingMode, setEditingMode] = useState(false);
  const [newCardMode, setNewCardMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const size = 42;
  const color = palette[700];

  const filteredAndSortedCards = React.useMemo(() => {
    return [...(cards || [])]
      .filter((card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      );
  }, [cards, searchQuery]);

  const handleExpand = (card: any) => {
    setActiveCard(card);
    setBlurred(true);
  };

  const handleClose = () => {
    setActiveCard(null);
    setBlurred(false);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: modePalette.primaryBg }}>
      {/* Centered content column */}
      <View
        style={{
          flex: 1,
          width: "100%",
          maxWidth: MAX_WIDTH,
          alignSelf: "center",
          paddingHorizontal: 16,
          paddingTop: 8,
        }}
      >
        <SearchBar query={searchQuery} onSearch={setSearchQuery} />
        <CardList
          onExpand={handleExpand}
          onClose={handleClose}
          cards={filteredAndSortedCards}
          isEditing={editingMode}
          color={color}
        />
      </View>

      {/* Blur sits above cards, below expanded card */}
      {blurred &&
        (Platform.OS === "web" ? (
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: "rgba(0,0,0,0.4)" },
            ]}
            pointerEvents="none"
          />
        ) : (
          <BlurView
            intensity={40}
            tint="dark"
            style={StyleSheet.absoluteFillObject}
            pointerEvents="none"
          />
        ))}

      {/*  Expanded card on top of blur */}
      {activeCard && (
        <ExpandedCardOverlay card={activeCard} onClose={handleClose} />
      )}

      {/* FAB buttons — centered and constrained */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: "center",
        }}
        pointerEvents="box-none"
      >
        <View
          style={{
            width: "100%",
            maxWidth: MAX_WIDTH,
            paddingHorizontal: 24,
            paddingBottom: 24,
          }}
          pointerEvents="box-none"
        >
          {editingMode && (
            <Pressable
              className="w-4/12 max-w-[300px] py-3 rounded-lg ml-auto my-5"
              style={{ backgroundColor: color }}
              onPress={() => setEditingMode(false)}
            >
              <Text className="text-white text-base font-semibold text-center">
                Done Editing
              </Text>
            </Pressable>
          )}
          <View className="flex-row justify-between" pointerEvents="box-none">
            <Pressable
              className="p-2 rounded-full"
              style={{ backgroundColor: modePalette.tertiaryBg }}
              onPress={() => setNewCardMode(true)}
            >
              <MaterialIcons name="add" size={size} color={color} />
            </Pressable>
            <Pressable
              className="p-2 rounded-full"
              style={{ backgroundColor: modePalette.tertiaryBg }}
              onPress={() => setEditingMode(true)}
            >
              <MaterialIcons name="create" size={size} color={color} />
            </Pressable>
          </View>
        </View>
      </View>

      <NewCardModal
        visible={newCardMode}
        onClose={() => setNewCardMode(false)}
        onSubmit={addCard}
      />
    </View>
  );
};

export default HomeScreen;
