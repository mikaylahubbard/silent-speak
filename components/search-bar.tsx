import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
// NativeWind classes are applied via the 'className' prop

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const size = 32;
  const color = "#59168B";

  return (
    <View className="p-2 flex flex-row bg-white rounded-lg w-full items-center drop-shadow-lg">
      <TextInput
        className="h-10 px-4 flex-1 border border-gray-300 rounded-md focus:border-violet-500"
        placeholder="Search..."
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          //   onSearch(text); // Trigger search logic in parent component
        }}
      />
      <Pressable className="ps-2">
        <MaterialIcons name="search" size={size} color={color} />
      </Pressable>
    </View>
  );
};
export default SearchBar;
