import { useSession } from "@/context";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";
// import "../../global.css";

interface CardItemProps {
  id: string | number;
  title: string;
  description: string;
  expand?: () => void;
  setEditingCard?: () => void;
  isEditing: boolean;
  color: string;
}

const CardItem = ({
  id,
  title,
  description,
  expand,
  setEditingCard,
  isEditing,
  color,
}: CardItemProps) => {
  const { deleteCard } = useSession();
  return (
    <TouchableOpacity
      onPress={expand}
      className="border border-neutral-200 rounded-xl my-1 py-6 px-5 bg-neutral-200"
      activeOpacity={0.8}
    >
      <View className="flex flex-row items-center justify-between">
        {isEditing && (
          <Animated.View
            entering={FadeInLeft}
            exiting={FadeOutLeft}
            className="pe-4"
          >
            <Pressable>
              <MaterialIcons
                name="delete"
                size={28}
                color={color}
                onPress={() => deleteCard(String(id))}
              />
            </Pressable>
          </Animated.View>
        )}
        <View className="flex-1 pr-2">
          <Text className="text-xl font-semibold mb-1">{title}</Text>
          <Text className="text-sm text-neutral-700">{description}</Text>
        </View>
        {isEditing && (
          <Animated.View entering={FadeInRight} exiting={FadeOutRight}>
            <Pressable>
              <MaterialIcons
                name="edit"
                size={28}
                color={color}
                onPress={setEditingCard}
              />
            </Pressable>
          </Animated.View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;
