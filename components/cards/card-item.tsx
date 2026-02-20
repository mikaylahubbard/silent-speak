import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import "../../global.css";

interface CardItemProps {
  id: string | number;
  title: string;
  description: string;
  expand?: () => void;
}

const CardItem = ({ id, title, description, expand }: CardItemProps) => {
  return (
    <TouchableOpacity
      onPress={expand}
      className="border border-neutral-200 rounded-xl my-1 p-6 bg-neutral-200"
      activeOpacity={0.8}
    >
      <View>
        <Text className="text-xl font-semibold mb-1">{title}</Text>
        <Text className="text-sm text-neutral-700-700">{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;
