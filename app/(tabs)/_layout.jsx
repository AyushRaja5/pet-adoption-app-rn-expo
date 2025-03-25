import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import Entypo from '@expo/vector-icons/Entypo';
import { useFonts } from "expo-font";
import { Stack, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import Colors from "../../constants/Colors";

export default function TabLayout() {


    return (
            <Tabs
             screenOptions={{
                    tabBarActiveTintColor: Colors.ICONS,
                    tabBarInactiveTintColor: Colors.SECONDARY,
                    tabBarShowLabel: true,
                    tabBarStyle: {
                        backgroundColor: Colors.BACKGROUND,
                        borderTopColor: Colors.BORDER,
                        borderTopWidth: 1,
                    },
                    tabBarActiveBackgroundColor: Colors.TINT,
             }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ focused }) => (<Entypo name="home" size={24} color={focused ? Colors.ICONS : Colors.SECONDARY}  />),
                        headerShown: false,
                    }}
                />
                <Tabs.Screen name="favorite" 
                    options={{
                        title: "Favorite",
                        tabBarIcon: ({ focused }) => (<Entypo name="heart" size={24} color={focused ? Colors.ICONS : Colors.SECONDARY}  />),
                        headerShown: false,
                    }}
                />
                <Tabs.Screen name="inbox" 
                    options={{
                        title: "Inbox",
                        tabBarIcon: ({ focused }) => (<Entypo name="chat" size={24} color={focused ? Colors.ICONS : Colors.SECONDARY}  />),
                        headerShown: false,
                    }}
                />
                <Tabs.Screen name="profile" 
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ focused }) => (<Entypo name="user" size={24} color={focused ? Colors.ICONS : Colors.SECONDARY}  />),
                        headerShown: false,
                    }}
                />
            </Tabs>
    );
}
