import { View, Text, Image, Platform, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import MarkFav from '../MarkFav/MarkFav';

const PetInfo = ({ pet }) => {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: Colors.BACKGROUND }}>
                <View
                    style={{
                        flexDirection: Platform.OS === "web" ? "row" : "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        padding: Platform.OS === "web" ? 30 : 10
                    }}
                >
                    {/* Pet Image */}
                    <Image
                        source={{ uri: pet.img }}
                        style={{
                            width: Platform.OS === "web" ? "45%" : "100%",
                            height: Platform.OS === "web" ? "90vh" : 400,
                            borderRadius: 20,
                            objectFit: 'cover',
                            shadowColor: "#000",
                            shadowOpacity: 0.2,
                            shadowOffset: { width: 0, height: 5 },
                            shadowRadius: 10,
                            elevation: 5,
                        }}
                        resizeMode="cover"
                    />

                    {/* Pet Details Section */}
                    <View
                        style={{
                            flex: 1,
                            marginLeft: Platform.OS === "web" ? 20 : 0,
                            marginTop: Platform.OS === "web" ? 0 : 10,
                            padding: 20,
                            borderRadius: 20,
                            backgroundColor: "#fff",
                            shadowColor: "#000",
                            shadowOpacity: 0.1,
                            shadowOffset: { width: 0, height: 5 },
                            shadowRadius: 10,
                            elevation: 5,
                            width: Platform.OS === "web" ? "45%" : "100%",
                        }}
                    >
                        {/* Pet Name & Details */}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View>
                                <Text style={{ fontSize: 30, fontWeight: "bold", color: Colors.PRIMARY }}>{pet.name}</Text>
                                <Text style={{ fontSize: 16, color: Colors.SECONDARY, marginTop: 5 }}>
                                    {pet?.breed || "Unknown Breed"}
                                </Text>
                            </View>
                            <MarkFav pet={pet}/>
                        </View>

                        {/* Pet Details */}
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 15,
                            paddingVertical: 10,
                            borderRadius: 10,
                            backgroundColor: Colors.LIGHT_BG
                        }}>
                            {/* Age */}
                            <View style={{ alignItems: "center" }}>
                                <FontAwesome5 name="birthday-cake" size={20} color={Colors.PRIMARY} />
                                <Text style={{ fontSize: 14, color: Colors.TEXT, marginTop: 5 }}>{pet.age} years</Text>
                            </View>

                            {/* Breed */}
                            <View style={{ alignItems: "center" }}>
                                <MaterialIcons name="pets" size={20} color={Colors.PRIMARY} />
                                <Text style={{ fontSize: 14, color: Colors.TEXT, marginTop: 5 }}>{pet.breed}</Text>
                            </View>

                            {/* Weight */}
                            <View style={{ alignItems: "center" }}>
                                <MaterialIcons name="scale" size={20} color={Colors.PRIMARY} />
                                <Text style={{ fontSize: 14, color: Colors.TEXT, marginTop: 5 }}>{pet?.weight || 'NA/0kg'}</Text>
                            </View>

                            {/* Sex */}
                            <View style={{ alignItems: "center" }}>
                                <Ionicons
                                    name={pet.sex === "male" ? "male" : "female"}
                                    size={20}
                                    color={pet.sex === "male" ? "blue" : "pink"}
                                />
                                <Text style={{ fontSize: 14, color: Colors.TEXT, marginTop: 5 }}>{pet.sex}</Text>
                            </View>
                        </View>

                        {/* About Section */}
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 22, fontWeight: "bold", color: Colors.PRIMARY }}>About</Text>
                            <Text style={{ fontSize: 16, color: Colors.TEXT, marginTop: 5, textAlign: "justify" }}>
                                {pet.about || "No description available for this pet."}
                            </Text>
                        </View>

                        {/* Owner Information */}
                        <Text style={{ fontSize: 22, fontWeight: "bold", color: Colors.PRIMARY, marginTop: 10 }}>
                            Owner Information
                        </Text>
                        <View
                            style={{
                                marginTop: Platform.OS === 'web' ? 20 : 10,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: Colors.PRIMARY,
                                backgroundColor: Colors.LIGHT_BG,
                                borderRadius: 10,
                            }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                {/* Owner Avatar & Details */}
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    {/* Owner Avatar */}
                                    <Image
                                        source={pet.user?.avatar ? { uri: pet.user.avatar } : require("../../assets/images/profilepic.png")}
                                        style={{
                                            width: Platform.OS === 'web' ? 60 : 40,
                                            height: Platform.OS === 'web' ? 60 : 40,
                                            borderRadius: 30,
                                            borderWidth: 2,
                                            borderColor: Colors.PRIMARY,
                                            marginRight: 6
                                        }}
                                    />

                                    {/* Owner Details */}
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.TEXT }}>
                                            👤 {pet.user?.name || "Unknown Owner"}
                                        </Text>
                                        <Text style={{ fontSize: 16, color: Colors.SECONDARY, marginTop: 3 }}>
                                            📧 {pet.user?.email || "Not provided"}
                                        </Text>
                                        <Text style={{ fontSize: 16, color: Colors.SECONDARY, marginTop: 3 }}>
                                            📞 {pet.user?.Mobile || "Not provided"}
                                        </Text>
                                    </View>
                                </View>

                                {/* Chat Icon */}
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: Colors.PRIMARY,
                                        padding: 10,
                                        borderRadius: 50,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                    onPress={() => console.log("Chat with owner")}
                                >
                                    <Ionicons name="paper-plane" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>


        </View>
    );
};

export default PetInfo;
