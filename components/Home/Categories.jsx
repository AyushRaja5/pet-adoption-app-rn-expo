import { View, Text, useWindowDimensions, FlatList, Image, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../../config/FirebaseConfig";
import Colors from '../../constants/Colors';
const Categories = ({ onCategorySelect = () => {} }) => {
    const { width } = useWindowDimensions();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Dog');
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Category"));
                const categoryData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCategories(categoryData);
            } catch (error) {
                console.error("Error fetching categories: ", error);
            }
        };

        fetchCategory();
    }, []);


    return (
        <FlatList
            data={categories}
            style={{ flex: 1}}
            numColumns={Platform.OS === "web" ? 5 : 3}
            contentContainerStyle={{
                justifyContent: "center",
                alignItems: "end",
                paddingVertical: 10,
            }}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Categories</Text>}
            renderItem={({ item }) => (
                <TouchableOpacity
                        onPress={() => {
                            setSelectedCategory(item.name)
                            onCategorySelect(item.name)
                        }}
                        style={{
                            width: Platform.OS === "web" ? width / 5 - 30 : width / 3 - 25,
                            margin: 5,
                            padding: 10,
                            backgroundColor: selectedCategory===item.name ? Colors.TINT :  Colors.CARD,
                            borderRadius: 10,
                            borderColor: Colors.NOTIFICATION,
                            borderWidth: 1,
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOpacity: 0.1,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <Image
                            source={{ uri: item.img }}
                            style={{ width: 50, height: 50 }}
                            resizeMode="contain"
                        />
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: selectedCategory===item.name ? Colors.CARDSELECTED :  Colors.TINT, }}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
    );
};

export default Categories;
