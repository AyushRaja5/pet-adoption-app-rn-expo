import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useNavigation } from 'expo-router';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const chatId = 'global-chat'; 

  useEffect(() => {
    navigation.setOptions({ title: 'Chat' });

    const q = query(
      collection(db, 'Chats', chatId, 'Messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, 'Chats', chatId, 'Messages'), {
        text: message,
        sender: 'user@example.com', // Replace with logged-in user
        timestamp: serverTimestamp(),
      });
      setMessage('');
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{
      backgroundColor: '#DCF8C6',
      padding: 10,
      borderRadius: 8,
      marginVertical: 4,
      alignSelf: item.sender === 'user@example.com' ? 'flex-end' : 'flex-start'
    }}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 16 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 60 }}
      />

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 16,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 15,
        elevation: 5
      }}>
        <TextInput
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
          style={{ flex: 1, height: 50 }}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text style={{ color: '#2196F3', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
