import React from "react";
import { Pressable, View } from "react-native";

type ColorOption = {
  themeName: string;
  color: string;
};

const colorOptionsData: ColorOption[] = [
  { themeName: "red", color: "bg-red-500" },
  { themeName: "orange", color: "bg-orange-500" },
  { themeName: "yellow", color: "bg-yellow-500" },
  { themeName: "emerald", color: "bg-emerald-500" },
  { themeName: "cyan", color: "bg-cyan-500" },
  { themeName: "blue", color: "bg-blue-500" },
  { themeName: "violet", color: "bg-violet-500" },
  { themeName: "fuchsia", color: "bg-fuchsia-500" },
  { themeName: "pink", color: "bg-pink-500" },
];

type Props = {
  selected?: string;
  onSelect: (theme: string) => void;
};

const ColorGrid = ({ selected, onSelect }: Props) => {
  return (
    <View className="flex-row flex-wrap justify-center">
      {colorOptionsData.map((item) => {
        const isSelected = selected === item.themeName;

        return (
          <Pressable
            key={item.themeName}
            onPress={() => onSelect(item.themeName)}
            className="m-1"
          >
            <View
              className={`w-24 h-24 items-center justify-center rounded-xl ${
                isSelected ? "border-4 border-neutral-400" : "bg-neutral-100"
              }`}
            >
              <View className={`w-20 h-20 rounded-lg ${item.color}`} />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default ColorGrid;
