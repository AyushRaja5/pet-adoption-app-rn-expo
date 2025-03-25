import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Platform, ToastAndroid, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { router, useNavigation } from 'expo-router';
import SaveUserInfo from '../../config/SaveUserInfo';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';

const AddNewPetScreen = () => {
    const navigation = useNavigation();

    const [petName, setPetName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [about, setAbout] = useState('');
    const [category, setCategory] = useState('');
    const [sex, setSex] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false); // 🔄 Loading state

    useEffect(() => {
        navigation.setOptions({
            title: 'Add New Pet',
            headerBackTitle: 'Back',
        });
        fetchUserEmail();
    }, []);

    const fetchUserEmail = async () => {
        try {
            const email = await SaveUserInfo.getUserEmail();
            if (email) setUserEmail(email);
        } catch (error) {
            console.error('Failed to fetch user email:', error);
        }
    };

    const clearForm = () => {
        setPetName('');
        setBreed('');
        setAge('');
        setWeight('');
        setAbout('');
        setCategory('');
        setSex('');
        setUserMobile('');
        setImageUrl('');
    };

    const handleAddPet = async () => {
        if (!petName || !breed || !age || !weight || !category || !sex || !userMobile || !imageUrl) {
            if (Platform.OS === 'android') {
                ToastAndroid.show('Please fill all required fields', ToastAndroid.SHORT);
            } else {
                Alert.alert('Validation Error', 'Please fill all required fields');
            }
            return;
        }
    
        if (loading) return;
        setLoading(true);
        try {
            const docId = new Date().getTime().toString();
            const petData = {
                id: docId,
                name: petName,
                breed,
                age,
                weight,
                about,
                category,
                sex,
                user: { email : userEmail, Mobile : userMobile, name: 'User' },
                img: imageUrl,
            };
            const res = await setDoc(doc(db, `Pets`, docId), petData);
            console.log('Pet added:', res);
            if (Platform.OS === 'android') {
                ToastAndroid.show('Pet added successfully', ToastAndroid.SHORT);
            } else {
                Alert.alert('Success', 'Pet added successfully');
            }
          clearForm();
          router.replace('/(tabs)/home');
        } catch (error) {
            console.error('Error adding pet:', error);
            Alert.alert('Error', 'Failed to add pet');
        } finally {
            setLoading(false);
        }
    };

    
    return (
        <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#FAFAFA' }}>
            <View style={formCard}>
                <Text style={heading}>🐶 Add Your Pet</Text>

                <Text style={label}>Pet Name:</Text>
                <TextInput placeholder="Enter Pet Name" value={petName} onChangeText={setPetName} style={inputStyle} />

                <Text style={label}>Breed:</Text>
                <TextInput placeholder="Enter Breed" value={breed} onChangeText={setBreed} style={inputStyle} />

                <Text style={label}>Age:</Text>
                <TextInput placeholder="Enter Age" value={age} onChangeText={setAge} keyboardType="number-pad" style={inputStyle} />

                <Text style={label}>Weight (in kg):</Text>
                <TextInput placeholder="Enter Weight" value={weight} onChangeText={setWeight} keyboardType="decimal-pad" style={inputStyle} />

                <Text style={label}>Category:</Text>
                <RNPickerSelect
                    onValueChange={setCategory}
                    value={category}
                    placeholder={{ label: 'Select Category', value: '' }}
                    items={[
                        { label: 'Dog', value: 'Dog' },
                        { label: 'Cat', value: 'Cat' },
                        { label: 'Bird', value: 'Bird' },
                        { label: 'Rabbit', value: 'Rabbit' },
                        { label: 'Fish', value: 'Fish' },
                    ]}
                    style={pickerSelectStyles}
                />

                <Text style={label}>Sex:</Text>
                <RNPickerSelect
                    onValueChange={setSex}
                    value={sex}
                    placeholder={{ label: 'Select Sex', value: '' }}
                    items={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Female' },
                    ]}
                    style={pickerSelectStyles}
                />

                <Text style={label}>User Mobile:</Text>
                <TextInput placeholder="Enter Mobile Number" value={userMobile} onChangeText={setUserMobile} keyboardType="phone-pad" style={inputStyle} />

                <Text style={label}>About:</Text>
                <TextInput
                    placeholder="Write something about your pet..."
                    value={about}
                    onChangeText={setAbout}
                    multiline
                    numberOfLines={4}
                    style={[inputStyle, { height: 100, textAlignVertical: 'top' }]}
                />

                <Text style={label}>Pet Image Link (URL):</Text>
                <TextInput placeholder="Enter Image URL" value={imageUrl} onChangeText={setImageUrl} style={inputStyle} />

                <View style={{ flex: 1, alignItems: 'center', height: 100, justifyContent: 'center' }}>
                    {imageUrl ? <Image source={{ uri: imageUrl }} style={imageStyle} /> : null}
                </View>

                <TouchableOpacity
                    onPress={handleAddPet}
                    style={[submitBtn, loading && { backgroundColor: '#A9A9A9' }]}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Add Pet</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

// 🔥 Styles
const formCard = {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 30,
};

const heading = {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
};

const label = {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
};

const inputStyle = {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    fontSize: 15,
};

const submitBtn = {
    backgroundColor: '#2196F3',
    padding: 16,
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 20,
};

const imageStyle = {
    width: '100%',
    height: 200,
    marginVertical: 15,
    borderRadius: 12,
};

const pickerSelectStyles = {
    inputIOS: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 15,
        fontSize: 15,
        color: '#333',
    },
    inputAndroid: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 15,
        fontSize: 15,
        color: '#333',
    },
    inputWeb: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 15,
        fontSize: 15,
        color: '#333',
    },
};

export default AddNewPetScreen;
