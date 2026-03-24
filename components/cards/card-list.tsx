import { useSession } from "@/context";
import React, { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import EditCardModal from "../forms/edit-card";
import CardItem from "./card-item";
import ExpandedCardOverlay from "./expanded-card";

interface Card {
  id: string | number;
  title: string;
  description: string;
}

interface CardListProps {
  onExpand?: () => void;
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
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [cardToEdit, setCardToEdit] = useState<Card | null>(null);
  const { editCard } = useSession();

  const handleExpand = (card: Card) => {
    setActiveCard(card);
    onExpand?.(); // notify parent
  };

  const handleClose = () => {
    setActiveCard(null);
    onClose?.(); // notify parent
  };

  const handleEditingCard = (card: Card) => {
    setCardToEdit(card);
  };

  const closeEditingCard = () => {
    setCardToEdit(null);
  };

  const submitEditingCard = (
    title: string,
    description: string,
    id: string,
  ) => {
    setCardToEdit(null);
    editCard(title, description, id);
  };

  const renderItem = ({ item }: { item: Card }) => {
    return (
      <CardItem
        id={item.id}
        title={item.title}
        description={item.description}
        expand={() => handleExpand(item)}
        setEditingCard={() => handleEditingCard(item)}
        isEditing={isEditing}
        color={color}
      />
    );
  };

  return (
    <View className="flex-1">
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => console.log("refreshing...")}
          />
        }
      />

      {activeCard && (
        <ExpandedCardOverlay card={activeCard} onClose={handleClose} />
      )}

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
