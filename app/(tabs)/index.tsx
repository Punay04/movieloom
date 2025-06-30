import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Link, router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  return (
    <View className="flex h-full bg-gray-900">
      <ImageBackground
        source={require("../../assets/images/background.jpg")}
        className="w-full h-full"
      >
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        >
          {moviesLoading ? (
            <ActivityIndicator
              size={"large"}
              color={"#22c55e"}
              className="mt-10 self-center"
            />
          ) : moviesError ? (
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Error : {moviesError}
            </Text>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar onPress={() => router.push("/search")} />
              <>
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Latest Movies
                </Text>

                <FlatList
                  data={movies}
                  renderItem={({ item }) => <MovieCard {...item} />}
                  keyExtractor={(item) => item.id}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 20,
                    marginBottom: 20,
                    paddingRight: 5,
                  }}
                  className="mt-2 pb-32"
                  scrollEnabled={false}
                />
              </>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
