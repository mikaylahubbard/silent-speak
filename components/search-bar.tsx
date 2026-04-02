import { useSession } from "@/context";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
// NativeWind classes are applied via the 'className' prop

interface SearchBarProps {
  query: string;
  onSearch: (text: string) => void;
}

const SearchBar = ({ query, onSearch }: SearchBarProps) => {
  const { palette } = useSession();
  const size = 32;
  const color = palette[700];
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="p-2 flex flex-row bg-white rounded-lg w-full items-center drop-shadow-lg">
      <TextInput
        className="h-10 px-4 flex-1 border border-gray-300 rounded-md"
        placeholder="Search..."
        value={query}
        onChangeText={(text) => {
          onSearch(text);
        }}
        style={{
          borderColor: isFocused ? palette[500] : "#d1d5db", // gray-300
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Pressable className="ps-2">
        <MaterialIcons name="search" size={size} color={color} />
      </Pressable>
    </View>
  );
};
export default SearchBar;
