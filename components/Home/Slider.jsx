import { View, Text, Image, FlatList, ActivityIndicator, useWindowDimensions, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

const Slider = () => {
  const {width, height} = useWindowDimensions();
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Sliders"));
        const sliderData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSliders(sliderData);
      } catch (error) {
        console.error("Error fetching sliders: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#ff5733" />;

  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={sliders}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.img }}
              style={{ width: width - 60, height: Platform.OS==="web"? height * 0.7 : 200, borderRadius: 15 }} 
            />
            <Text style={{ textAlign: "center", marginTop: 5, fontSize: 16 }}>
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Slider;
