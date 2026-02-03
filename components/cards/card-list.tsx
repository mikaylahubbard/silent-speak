import React, { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import DUMMY_DATA from "../../data/dummy-data";
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
}

const CardList = ({ onExpand, onClose }: CardListProps) => {
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
    <View style={{ flex: 1 }}>
      <FlatList
        data={DUMMY_DATA}
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
