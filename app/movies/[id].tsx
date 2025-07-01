import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMoviesDetails } from "@/services/api";
import { ArrowLeftToLine, StarIcon } from "lucide-react-native";

interface MovieinfoProps {
  label: string;
  value: string | number | null;
}

const MovieInfo = ({ label, value }: MovieinfoProps) => (
  <View className="flex-col items-start justify-center mt-5 ">
    <Text className="text-sm font-semibold text-gray-400">{label}</Text>
    <Text className="text-gray-200 font-bold mt-2">{value || "N/A"}</Text>
  </View>
);

const Page = () => {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMoviesDetails(id as string));

  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (movie?.title) {
      navigation.setOptions({
        title: movie.title,
        headerStyle: { backgroundColor: "#0f172a" },
        headerTintColor: "#fff",
      });
    }
  }, [movie?.title]);
  return (
    <View className="flex-1 bg-slate-950">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[400px]"
            resizeMode="stretch"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-sm font-semibold text-gray-400">
              {movie?.release_date.split("-")[0]}
            </Text>
            <Text className="text-sm font-semibold text-gray-400 ml-1">
              {movie?.runtime}m
            </Text>
          </View>

          <View className="flex-row items-center bg-zinc-900 px-2 py-1 rounded-md gap-x-1 mt-2">
            <StarIcon color={"yellow"} fill={"yellow"} />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average)}/10
            </Text>
            <Text className="text-gray-400 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />

          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g: any) => g.name).join(" - ")}
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget / 1_000_000} million                `}
            />
            <MovieInfo
              label="Revenue"
              value={`$${(Math.round(movie?.revenue) / 1_000_000).toFixed(2)} million `}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={movie?.production_companies
              ?.map((g: any) => g.name)
              .join(" - ")}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolut bottom-5 left-0 right-0  mx-5 bg-green-700 rounded-lg py-3 flex flex-row items-center justify-center"
        onPress={router.back}
      >
        <ArrowLeftToLine color={"white"} />
        <Text className="text-white font-bold ml-2">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;
