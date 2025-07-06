import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import { makeHomeStyles } from '../style/Homepagecss';

export default function Home() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = useMemo(() => makeHomeStyles(colors), [colors]);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [storageKey, setStorageKey] = useState('');
  const [selectedMsgId, setSelectedMsg] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    (async () => {
      const email = await AsyncStorage.getItem('email');
      if (!email) return;
      const normalized = email.trim().toLowerCase();
      setCurrentUser(normalized);
      setStorageKey(`ChatMessage_${normalized}`);
    })();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const fetchMessages = async () => {
      const sent = await firestore().collection('chats').where('senderId', '==', currentUser).get();
      const received = await firestore().collection('chats').where('receiverId', '==', currentUser).get();

      const map = (doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.message,
          sender: data.senderId,
          receiver: data.receiverId,
          timestamp: data.timestamp.toMillis(),
          time: new Date(data.timestamp.toMillis()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: new Date(data.timestamp.toMillis()).toDateString(),
          reaction: data.reaction || null,
        };
      };

      const combined = [...sent.docs.map(map), ...received.docs.map(map)].sort((a, b) => b.timestamp - a.timestamp);
      const local = await AsyncStorage.getItem(storageKey);
      if (local) {
        const localMsgs = JSON.parse(local);
        combined.forEach((msg) => {
          const stored = localMsgs.find(m => m.id === msg.id);
          if (stored && stored.reaction) msg.reaction = stored.reaction;
        });
      }

      setMessages(combined);
      await AsyncStorage.setItem(storageKey, JSON.stringify(combined));
    };

    fetchMessages();
    const id = setInterval(fetchMessages, 10000);
    return () => clearInterval(id);
  }, [currentUser, storageKey]);

  const react = async (id, reaction) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, reaction } : msg
    );
    setMessages(updatedMessages);
    setSelectedMsg(null);
    await AsyncStorage.setItem(storageKey, JSON.stringify(updatedMessages));
  };

  const renderItem = ({ item, index }) => {
    const showDate = index === messages.length - 1 || item.date !== messages[index + 1]?.date;
    const mine = item.sender === currentUser;
    const selected = selectedMsgId === item.id;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={() => setSelectedMsg(item.id)}
        style={{ marginBottom: 15 }}
      >
        {showDate && <Text style={styles.dateHeader}>{item.date}</Text>}

        {selected && (
          <View style={styles.reactionIconContainer}>
            <TouchableOpacity onPress={() => react(item.id, '👍')}>
              <Text style={styles.emoji}>👍</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => react(item.id, '👎')}>
              <Text style={styles.emoji}>👎</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ alignSelf: mine ? 'flex-end' : 'flex-start' }}>
          <View style={[
            mine ? styles.sentMessageBubble : styles.receivedMessageBubble,
            selected && styles.selectedMessageBubble
          ]}>
            <Text style={[styles.messageText, { color: mine ? '#fff' : colors.text }]}>
              {item.text}
            </Text>
            <Text style={[styles.messageTime, { color: mine ? '#fff' : colors.text }]}>
              {item.time}
            </Text>
          </View>

          {item.reaction && (
            <View style={styles.reactionBelowBubble}>
              <Text style={styles.emoji}>{item.reaction}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const sendMessage = async () => {
    if (sending || !inputText.trim()) return;

    setSending(true);
    try {
      const res = await axios.post(
        'https://59e4-182-156-140-71.ngrok-free.app/api/send-message',
        {
          senderId: currentUser,
          message: inputText.trim(),
        }
      );

      if (res.status === 200) {
        setInputText('');
      }
    } catch (error) {
      console.error('Message failed:', error);
      Alert.alert('Message failed');
    } finally {
      setSending(false);
    }
  };


  return (
    <View style={styles.screen}>
      <View style={styles.homecontainer}>
        <Text style={styles.chat}>Chat</Text>
        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          <Ionicons name="person-circle" size={35} color={colors.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messageList}
      />

      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Ask anything"
          value={inputText}
          onChangeText={setInputText}
          placeholderTextColor={colors.text}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={28} color="#007bff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
