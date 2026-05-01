import { useSession } from "@/context";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import EditCardModal from "../forms/edit-card";
import CardItem from "./card-item";

interface Card {
  id: string | number;
  title: string;
  description: string;
}

interface CardListProps {
  onExpand?: (card: Card) => void;
  onClose?: () => void;
  cards: any[];
  isEditing: boolean;
  color: string;
}

const CardList = ({
  onExpand,
  onClose,
  cards,
  isEditing,
  color,
}: CardListProps) => {
  // const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [cardToEdit, setCardToEdit] = useState<Card | null>(null);
  const { editCard } = useSession();

  // const handleExpand = (card: Card) => {
  //   setActiveCard(card);
  //   onExpand?.();
  // };
  // const handleClose = () => {
  //   setActiveCard(null);
  //   onClose?.();
  // };
  const handleEditingCard = (card: Card) => setCardToEdit(card);
  const closeEditingCard = () => setCardToEdit(null);
  const submitEditingCard = (
    title: string,
    description: string,
    id: string,
  ) => {
    setCardToEdit(null);
    editCard(title, description, id);
  };

  return (
    <View className="flex-1">
      {Platform.OS === "web" ? (
        // ScrollView + map , so it works reliably on web
        <ScrollView>
          {cards.map((item) => (
            <CardItem
              key={item.id.toString()}
              id={item.id}
              title={item.title}
              description={item.description}
              expand={() => onExpand?.(item)}
              setEditingCard={() => handleEditingCard(item)}
              isEditing={isEditing}
              color={color}
            />
          ))}
        </ScrollView>
      ) : (
        // FlatList on native
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardItem
              id={item.id}
              title={item.title}
              description={item.description}
              expand={() => onExpand?.(item)}
              setEditingCard={() => handleEditingCard(item)}
              isEditing={isEditing}
              color={color}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => console.log("refreshing...")}
            />
          }
        />
      )}

      {/* {activeCard && (
        <ExpandedCardOverlay card={activeCard} onClose={handleClose} />
      )} */}
      {cardToEdit && (
        <EditCardModal
          visible={true}
          onClose={closeEditingCard}
          onSubmit={submitEditingCard}
          currentTitle={cardToEdit.title}
          currentMessage={cardToEdit.description}
          id={String(cardToEdit.id)}
        />
      )}
    </View>
  );
};

export default CardList;
