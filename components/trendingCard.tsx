import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";

type TrendingCardProps = {
  movie: {
    movie_id: string;
    title: string;
    poster_path: string;
  };
  index: number;
};

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: any) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-4">
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48  rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="text-5xl font-bold text-white">{index + 1}</Text>
            }
          >
            <View className="bg-yellow-500 w-12 h-12 " />
          </MaskedView>
        </View>
        <Text className="text-sm text-white font-bold mt-2" numberOfLines={1}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
