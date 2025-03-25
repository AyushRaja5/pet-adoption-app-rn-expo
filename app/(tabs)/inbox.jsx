import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from 'expo-router';

// Dummy users list - Replace this with data from Firestore later
const dummyUsers = [
  { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Lisa Williams', avatar: 'https://i.pravatar.cc/150?img=4' },
];

const InboxScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitle: 'Back',
    });
  }, []);


  useEffect(() => {
    setUsers(dummyUsers);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => navigation.navigate('chat/' + item.id)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.lastMessage}>Tap to chat</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: Platform.OS === 'web' ? 'auto' : 50 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>My Inbox</Text>
      
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      </ScrollView>
    </View>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 16,
    marginTop: Platform.OS === 'web' ? 0 : 20, padding: 20 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
});
