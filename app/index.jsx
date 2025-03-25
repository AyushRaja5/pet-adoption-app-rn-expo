import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function App() {
    const router = useRouter();
    return (
        <View
            style=
            {{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={{ fontSize: 20, color: "blue" }}>Hello World</Text>
            </TouchableOpacity>

            {/* Skip Login */}
            <Link  href={"/home"} style={{ marginTop: 20, textDecorationStyle: "dotted", textDecorationLine: "underline" }}>
                <Text style={{ fontFamily: "poppinBold", fontSize: 20 }}>Skip Login!</Text>
            </Link>
        </View>
    );
}