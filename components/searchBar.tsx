import { View, Text, TextInput } from "react-native";
import React from "react";
import { SearchIcon } from "lucide-react-native";

interface Props {
  placeholder?: string;
  onPress: () => void;
}

const SearchBar = ({ placeholder, onPress }: Props) => {
  return (
    <View className="flex-row items-center bg-gray-950  rounded-full px-5 py-4  mt-20">
      <SearchIcon color={"#22c55e"} />
      <TextInput
        onPress={onPress}
        placeholder={placeholder ? placeholder : "Search for a movie"}
        value=""
        onChangeText={() => {}}
        placeholderTextColor={"gray"}
        className="flex-1 ml-2 text-white "
      />
    </View>
  );
};

export default SearchBar;
