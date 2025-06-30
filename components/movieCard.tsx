import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { StarIcon } from "lucide-react-native";

interface Movie {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "https://placeholder.co/600×400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-smfont-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <StarIcon color={"yellow"} fill={"yellow"} />
          <View className="flex justify-center items-center">
            <Text className="text-xs text-gray-400 font-bold">
              {Math.round(vote_average / 2)}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between ">
          <Text className="text-xs text-gray-400 font-bold">
            {release_date.split("-")[0]}
          </Text>
          {/* <Text className="text-xs text-gray-400 font-bold">
            Movie
          </Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
