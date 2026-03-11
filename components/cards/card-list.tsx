import React, { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
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
}

const CardList = ({ onExpand, onClose, cards }: CardListProps) => {
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const handleExpand = (card: Card) => {
    setActiveCard(card);
    onExpand?.(); // notify parent
  };

  const handleClose = () => {
    setActiveCard(null);
    onClose?.(); // notify parent
  };

  const renderItem = ({ item }: { item: Card }) => {
    return (
      <CardItem
        id={item.id}
        title={item.title}
        description={item.description}
        expand={() => handleExpand(item)}
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
    </View>
  );
};

export default CardList;
