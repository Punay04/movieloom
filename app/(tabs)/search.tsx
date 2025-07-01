import {
  View,
  Text,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    fetchData: loadMovies,
    resetData,
  } = useFetch(
    () =>
      fetchMovies({
        query: searchQuery,
      }),
    false
  );

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        resetData();
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (movies?.[0] && movies?.length > 0) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);

  return (
    <View className="bg-gray-900 flex-1">
      <ImageBackground
        source={require("../../assets/images/background.jpg")}
        className="w-full h-full"
      >
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <MovieCard {...item} keyExtractor={(item: any) => item.id} />
          )}
          className="px-5"
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 16,
            marginVertical: 16,
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={
            <>
              <View className="my-5 w-full">
                <SearchBar
                  value={searchQuery}
                  onChangeText={(text: string) => setSearchQuery(text)}
                  placeholder="Search movies..."
                />
              </View>
              {moviesLoading && (
                <ActivityIndicator
                  size={"large"}
                  color={"#22c55e"}
                  className="mt-10 self-center"
                />
              )}

              {moviesError && (
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  {moviesError}
                </Text>
              )}

              {!moviesLoading &&
                !moviesError &&
                searchQuery.trim() !== "" &&
                movies?.length > 0 && (
                  <Text className="text-start text-xl font-bold text-green-500 t">
                    Search Results for{" "}
                    <Text className="text-white text-start italic font-bold">
                      {searchQuery}
                    </Text>
                  </Text>
                )}
            </>
          }
          ListEmptyComponent={
            !moviesLoading && !moviesError ? (
              <View className="mt-10 px-5">
                <Text className="text-lg text-gray-500 font-bold text-center">
                  {searchQuery.trim()
                    ? "No movies found"
                    : "Search for a movie"}
                </Text>
              </View>
            ) : null
          }
        />
      </ImageBackground>
    </View>
  );
};

export default Search;
