import { useSession } from "@/context";
import { PALETTES } from "@/theme/colorThemes";
import React from "react";
import { Pressable, View } from "react-native";

type ColorOption = {
  themeName: string;
  color: string;
};

type Props = {
  selected?: string;
  onSelect: (theme: string) => void;
};

const ColorGrid = ({ selected, onSelect }: Props) => {
  const { modePalette, mode } = useSession();

  const colorOptionsData: ColorOption[] = [
    { themeName: "red", color: PALETTES["red"][mode][500] },
    { themeName: "orange", color: PALETTES["orange"][mode][500] },
    { themeName: "yellow", color: PALETTES["yellow"][mode][500] },
    { themeName: "emerald", color: PALETTES["emerald"][mode][500] },
    { themeName: "cyan", color: PALETTES["cyan"][mode][500] },
    { themeName: "blue", color: PALETTES["blue"][mode][500] },
    { themeName: "violet", color: PALETTES["violet"][mode][500] },
    { themeName: "fuchsia", color: PALETTES["fuchsia"][mode][500] },
    { themeName: "pink", color: PALETTES["pink"][mode][500] },
  ];

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
                isSelected
                  ? "border-4 border-neutral-400"
                  : modePalette.primaryBg
              }`}
            >
              <View
                className="w-20 h-20 rounded-lg"
                style={{ backgroundColor: item.color }}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default ColorGrid;
