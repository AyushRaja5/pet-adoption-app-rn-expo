import { View, Text, Platform, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router'; // ✅ Import navigation hook
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import PetListByCategory from '../../components/Home/PetListByCategory';
import Colors from '../../constants/Colors';

const HomeScreen = () => {
  const router = useRouter();
  const data = [{}];
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={() => (
        <View style={{ flex: 1, marginTop: Platform.OS === "web" ? 0 : 20, padding: 20 }}>
          {/* Header */}
          <Header />

          {/* Slider banner */}
          <Slider />

          <PetListByCategory />

          {/* Add Your Pet */}
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.NOTIFICATION,
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 10,
                width: Platform.OS === "web" ? "20%" : "80%",
                alignItems: "center",
              }}
              onPress={() => router.push('add-new-pet')}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Add Your Pet</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

export default HomeScreen;
