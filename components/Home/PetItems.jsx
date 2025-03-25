import { View, Text, Image, Platform, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

const PetItems = ({ pet }) => {
  const router = useRouter();
  
  return (
    <TouchableOpacity
      onPress={()=>router.push({
        pathname :`/pet-details`,
        params: { pet: JSON.stringify(pet) },
      })}
    style={{
      backgroundColor: Colors.WHITE,
      padding: 3,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOpacity: 0.7,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
      margin: 10,
      alignItems: 'center',
      width: Platform.OS === 'web' ? '160px' : '45%',
      height: Platform.OS === 'web' ? 'auto' : 'auto',
    }}>
      <Image
        source={{ uri: pet.img }}
        style={{ width: 150, height: 150, borderRadius: 10, objectFit: "cover" }}
      />
      <View style={{ paddingHorizontal: 6, display: 'flex', width: '100%' }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{pet.name}</Text>
        <Text style={{ fontSize: 14, color: Colors.NOTIFICATION, backgroundColor:Colors.CARD, paddingHorizontal:5, borderRadius:10, display:'flex', alignItems:'center' }}>{pet.age} Yrs</Text>
      </View>
      
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{ fontSize: 14, color: Colors.SECONDARY }}>{pet.breed}</Text>
      <Text style={{ fontSize: 14, color: Colors.TINT}}>{pet.sex == 'male' ? 'M' : 'F'}</Text>
      </View>
      </View>
    </TouchableOpacity>
  );
};

export default PetItems;
