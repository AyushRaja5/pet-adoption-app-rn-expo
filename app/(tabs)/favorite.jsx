import { View, Text, ScrollView, Platform, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import PetInfo from '../../components/PetDetails/PetInfo';
import Shared from '../../Shared/Shared';
import SaveUserInfo from '../../config/SaveUserInfo';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import PetItems from '../../components/Home/PetItems';

const FavoriteScreen = () => {
  const [favIdList, setFavIdList] = useState([]);
  const [favPets, setFavPets] = useState([]);
  const [loading, setLoading] = useState(true); // 🔥 Added loading state

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const email = await SaveUserInfo.getUserEmail();
      if (email) {
        getFavIds(email);
      }
    } catch (error) {
      console.error("Error fetching user email:", error);
      setLoading(false);
    }
  };

  const getFavIds = async (email) => {
    try {
      if (!email) return;
      const res = await Shared.getFavList(email);
      console.log('Favorite list:', res);
      setFavIdList(res || []);
    } catch (error) {
      console.error("Error fetching favorite list:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (favIdList.length > 0) {
      getFavPetsById();
    } else {
      setLoading(false); // No favorites, stop loading
    }
  }, [favIdList]);

  const getFavPetsById = async () => {
    try {
      setLoading(true);
      const petsQuery = collection(db, 'Pets');
      const querySnapshot = await getDocs(petsQuery);

      const allPets = [];
      querySnapshot.forEach((doc) => {
        allPets.push({ id: doc.id, ...doc.data() });
      });

      const filteredPets = allPets.filter((pet) => favIdList.includes(pet.id));

      setFavPets(filteredPets);
      console.log('Fetched favorite pets:', filteredPets);
    } catch (error) {
      console.error('Error fetching favorite pets:', error);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <View style={{ flex: 1, marginTop: Platform.OS === 'web' ? 0 : 20, padding: 20 }}>
      <ScrollView style={{ marginBottom: Platform.OS === 'web' ? 'auto' : 50 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Favorite Pets:</Text>

        {loading ? ( // ✅ Show loader while fetching
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />
        ) : favPets.length > 0 ? (
          <FlatList
            data={favPets}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => <PetItems pet={item} />}
            contentContainerStyle={{
              paddingHorizontal: 10,
              maxWidth: 1000,
              alignSelf: 'center',
            }}
            columnWrapperStyle={{
              justifyContent: Platform.OS === 'web' ? 'flex-start' : 'space-between',
            }}
          />
        ) : (
          <Text>No favorites added yet.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default FavoriteScreen;
