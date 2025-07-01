import React from "react";
import { Tabs } from "expo-router";
import {
  HomeIcon,
  SearchIcon,
} from "lucide-react-native";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const _Layout = () => {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#18181b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "8%",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <>
                {focused ? (
                  <View className="flex items-center justify-center  p-1 rounded-md">
                    <HomeIcon color={"#22c55e"} />
                  </View>
                ) : (
                  <HomeIcon color="white" />
                )}
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            headerShown: false,
            title: "Search",
            tabBarIcon: ({ focused }) => (
              <>
                {focused ? (
                  <View className="flex items-center justify-center  p-1 rounded-md">
                    <SearchIcon color={"#22c55e"} />
                  </View>
                ) : (
                  <SearchIcon color="white" />
                )}
              </>
            ),
          }}
        />{" "}
        {/* <Tabs.Screen
          name="saved"
          options={{
            headerShown: false,
            title: "Saved",
            tabBarIcon: ({ focused }) => (
              <>
                {focused ? (
                  <View className="flex items-center justify-center  p-1 rounded-md">
                    <BookmarkIcon color={"#22c55e"} />
                  </View>
                ) : (
                  <BookmarkIcon color="white" />
                )}
              </>
            ),
          }}
        />{" "} */}
        {/* <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <>
                {focused ? (
                  <View className="flex items-center justify-center  p-1 rounded-md">
                    <UserIcon color={"#22c55e"} />
                  </View>
                ) : (
                  <UserIcon color="white" />
                )}
              </>
            ),
          }}
        /> */}
      </Tabs>
    </SafeAreaProvider>
  );
};

export default _Layout;
