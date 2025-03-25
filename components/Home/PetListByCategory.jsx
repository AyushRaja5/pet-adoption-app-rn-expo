import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../../config/FirebaseConfig";
import Categories from './Categories';
import PetItems from './PetItems';

const PetListByCategory = () => {
    const [petList, setPetList] = useState([]);
    const [loading, setLoading] = useState(false); // Added loading state

    const getPetListByCategory = async (category) => {
        try {
            setLoading(true);
            setPetList([]);
            const q = query(collection(db, "Pets"), where("category", "==", category));
            const querySnapshot = await getDocs(q);
            const pets = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPetList(pets);
        } catch (error) {
            console.error("Error fetching pets by category: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPetListByCategory("Dog");
    }, []);

    return (
        <View>
            <Categories onCategorySelect={(value) => getPetListByCategory(value)} />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Pets List</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
            ) : petList.length === 0 ? (
                <Text style={{ textAlign: "center", marginTop: 10 }}>No pets available.</Text>
            ) : (
                <FlatList
                    data={petList}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({ item }) => <PetItems pet={item} />}
                    contentContainerStyle={{ alignItems: "center" }}
                />
            )}
        </View>
    );
};

export default PetListByCategory;
