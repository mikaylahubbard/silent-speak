import React, { useState } from "react";
import { TextInput, View } from "react-native";
// NativeWind classes are applied via the 'className' prop

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <View className="p-2 flex mx-3 bg-white rounded-lg">
      <TextInput
        className="h-10 px-4 w-full border border-gray-300 rounded-md focus:border-violet-500"
        placeholder="Search..."
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          //   onSearch(text); // Trigger search logic in parent component
        }}
      />
    </View>
  );
};
export default SearchBar;
