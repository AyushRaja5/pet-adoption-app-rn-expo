import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import PetInfo from '../../components/PetDetails/PetInfo';
import Colors from '../../constants/Colors';

const PetDetails = () => {
    const { pet } = useLocalSearchParams();
    const parsedPet = JSON.parse(pet);

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: ''
        });
    }, []);

    return (
        <View>
            <ScrollView style={{ marginBottom: Platform.OS === 'web' ? 'auto' : 50 }}>
                <PetInfo pet={parsedPet} />
            </ScrollView>

            <TouchableOpacity
                style={{
                    position: "absolute",
                    bottom: Platform.OS === "web" ? 20 : 0,
                    left: Platform.OS === "web" ? 20 : 0,
                    right: Platform.OS === "web" ? 20 : 0,
                    width: Platform.OS === "web" ? "200px" : "100%",
                    backgroundColor: Colors.PRIMARY,
                    paddingVertical: 15,
                    borderRadius: Platform.OS === "web" ? 10 : 0,
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOpacity: 0.3,
                    shadowOffset: { width: 0, height: 5 },
                    shadowRadius: 10,
                    elevation: 5,
                }}
                onPress={() => console.log("Adopt Now Pressed")}
            >
                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Adopt Now</Text>
            </TouchableOpacity>
        </View>
    );
}

export default PetDetails