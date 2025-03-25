import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    age: '25',
    location: 'Bangalore, India',
  });

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        if (userEmail) setEmail(userEmail);
        else setEmail('No Email Found');
      } catch (error) {
        console.log('Error fetching email:', error);
      }
    };
    getUserEmail();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    Alert.alert('Logged Out', 'You have been logged out');
    navigation.navigate('(tabs)'); // Change route as per your setup
  };

  const handleSave = () => {
    setEditMode(false);
    Alert.alert('Profile Updated', 'Your profile info has been updated');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150' }}
        style={styles.avatar}
      />
      {editMode ? (
        <>
          <TextInput
            style={styles.input}
            value={userData.name}
            onChangeText={(text) => setUserData({ ...userData, name: text })}
          />
          <TextInput
            style={styles.input}
            value={userData.age}
            onChangeText={(text) => setUserData({ ...userData, age: text })}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={userData.location}
            onChangeText={(text) => setUserData({ ...userData, location: text })}
          />
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.info}>Age: {userData.age}</Text>
          <Text style={styles.info}>Location: {userData.location}</Text>
          <Text style={styles.info}>Email: {email}</Text>

          <TouchableOpacity style={styles.editBtn} onPress={() => setEditMode(true)}>
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginTop: Platform.OS === 'web' ? 0 : 50, padding: 20 
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    width: '90%',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  editBtn: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  saveBtn: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  logoutBtn: {
    backgroundColor: '#FF5252',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
