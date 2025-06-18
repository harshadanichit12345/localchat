import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../style/Homepagecss';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Home = () => {
  const navigation = useNavigation();
  const [StorageMessage, setStorageMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedMsgId, setSelectedMsgId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [pendingMessage, setPendingMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const init = async () => {
      const user = await AsyncStorage.getItem('loggedInUser');
      if (!user) return;

      setCurrentUser(user);
      const storageKey = `ChatMessage_${user}`;
      setStorageMessage(storageKey);

      await AsyncStorage.removeItem(storageKey);
      setMessages([]);
      await AsyncStorage.setItem(storageKey, JSON.stringify([]));

      const subscribed = await AsyncStorage.getItem(`subscribed_${user}`);
      setIsSubscribed(subscribed === 'true');

      console.log('Previous chat cleared on login');
    };
    init();
  }, []);

  useEffect(() => {
    if (!StorageMessage) return;

    const interval = setInterval(async () => {
      const stored = await AsyncStorage.getItem(StorageMessage);
      if (stored) {
        const parsed = JSON.parse(stored);
        const now = Date.now();
        const filtered = parsed.filter(
          msg => now - (msg.timestamp || 0) <= 3 * 60 * 60 * 1000
        );
        setMessages(filtered);
        await AsyncStorage.setItem(StorageMessage, JSON.stringify(filtered));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [StorageMessage]);

  const saveMessages = async (msgs) => {
    if (StorageMessage) {
      await AsyncStorage.setItem(StorageMessage, JSON.stringify(msgs));
    }
  };

  const handleSendMessage = async () => {
    const trimmedMessage = inputText.trim();

    if (!trimmedMessage) {
      Alert.alert('Validation', 'Message cannot be empty.');
      return;
    }

    if (messages.length === 0 || !isSubscribed) {
      setPendingMessage(trimmedMessage);
      setShowSubscribeModal(true);
      setInputText('');
      return;
    }

    sendMessage(trimmedMessage);
  };

  const sendMessage = async (messageToSend) => {
    const now = Date.now();
    const newMessage = {
      id: now.toString(),
      text: messageToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toDateString(),
      timestamp: now,
      sender: currentUser,
    };

    try {
      await axios.post('http://10.0.2.2:5000/api/send-message', {
        senderId: currentUser,
        message: messageToSend,
      });

      const updatedMessages = [newMessage, ...messages];
      setMessages(updatedMessages);
      await saveMessages(updatedMessages);
      setInputText('');
    } catch (error) {
      Alert.alert('Send Error', 'Message send failed. Please try again.');
    }
  };

  const handleSubscribe = async () => {
    try {
      await axios.post(`http://10.0.2.2:5000/api/subscribe/${currentUser}`);

      await AsyncStorage.setItem(`subscribed_${currentUser}`, 'true');
      setIsSubscribed(true);
      setShowSubscribeModal(false);

      if (pendingMessage) {
        sendMessage(pendingMessage);
        setPendingMessage('');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to subscribe. Please try again.');
    }
  };

  const handleLongPress = (id) => {
    setSelectedMsgId(prevId => (prevId === id ? null : id));
  };

  const handleReaction = (id, reaction) => {
    const updated = messages.map(msg => {
      if (msg.id === id) return { ...msg, reaction };
      return msg;
    });
    setMessages(updated);
    saveMessages(updated);
    setSelectedMsgId(null);
  };

  const renderItem = ({ item, index }) => {
    const isLast = index === messages.length - 1;
    const nextItem = messages[index + 1];
    const showDate = isLast || item.date !== nextItem?.date;
    const isSelected = selectedMsgId === item.id;

    return (
      <TouchableOpacity
        onLongPress={() => handleLongPress(item.id)}
        activeOpacity={1}
        style={{ marginBottom: 15 }}
      >
        {showDate && (
          <Text style={styles.dateHeader}>
            {new Date(item.date).toDateString()}
          </Text>
        )}

        {isSelected && (
          <View style={styles.reactionIconContainer}>
            <TouchableOpacity onPress={() => handleReaction(item.id, '👍')}>
              <Text style={styles.emoji}>👍</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleReaction(item.id, '👎')}>
              <Text style={styles.emoji}>👎</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ alignSelf: 'flex-end' }}>
          <View style={[
            styles.sentMessageBubble,
            isSelected && styles.selectedMessageBubble,
          ]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>

          {item.reaction && !isSelected && (
            <View style={styles.reactionBelowBubble}>
              <Text style={styles.emoji}>{item.reaction}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.homecontainer}>
        <Text style={styles.chat}>Chat</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuicon} onPress={() => navigation.navigate('profile')}>
          <Ionicons name="person-circle" size={35} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messageList}
        inverted
      />

      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Ask anything"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendIcon} onPress={handleSendMessage}>
          <Ionicons name="send" size={30} color="#007bff" />
        </TouchableOpacity>
      </View>

      <Modal visible={showSubscribeModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Subscribe to Start Chatting</Text>
            <TouchableOpacity onPress={handleSubscribe} style={styles.subscribeButton}>
              <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
