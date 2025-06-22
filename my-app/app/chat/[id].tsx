import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'

type Message = {
  id: string
  text: string
  senderId: string
  timestamp: string
  isMe: boolean
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hi! I saw your post about the lost Golden Retriever. I think I might have seen him near Central Park.',
    senderId: 'user2',
    timestamp: '2025-06-21T10:30:00Z',
    isMe: false
  },
  {
    id: '2',
    text: 'Really? That would be amazing! Can you tell me more details about what you saw?',
    senderId: 'user1',
    timestamp: '2025-06-21T10:32:00Z',
    isMe: true
  },
  {
    id: '3',
    text: 'I saw a golden retriever around 3 PM yesterday near the lake area. He was wearing a blue collar and seemed friendly but lost.',
    senderId: 'user2',
    timestamp: '2025-06-21T10:35:00Z',
    isMe: false
  },
  {
    id: '4',
    text: 'That sounds exactly like Max! Did you happen to see which direction he went?',
    senderId: 'user1',
    timestamp: '2025-06-21T10:37:00Z',
    isMe: true
  },
  {
    id: '5',
    text: 'He was heading towards the north entrance when I last saw him. I can meet you there if you want to look together.',
    senderId: 'user2',
    timestamp: '2025-06-21T10:40:00Z',
    isMe: false
  }
]

export default function ChatScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true })
    }
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim() === '') return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      senderId: 'user1',
      timestamp: new Date().toISOString(),
      isMe: true
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const MessageItem = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer, 
      item.isMe ? styles.myMessage : styles.otherMessage
    ]}>
      <View style={[
        styles.messageBubble,
        item.isMe ? styles.myBubble : styles.otherBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.isMe ? styles.myMessageText : styles.otherMessageText
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.messageTime,
          item.isMe ? styles.myMessageTime : styles.otherMessageTime
        ]}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
    </View>
  )

  const handleReportUser = () => {
    Alert.alert(
      'Report User',
      'Are you sure you want to report this user for inappropriate behavior?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Report', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Reported', 'User has been reported. Our team will review this conversation.')
          }
        }
      ]
    )
  }

  const handleBlockUser = () => {
    Alert.alert(
      'Block User',
      'Are you sure you want to block this user? You will no longer receive messages from them.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Block', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Blocked', 'User has been blocked.')
            router.back()
          }
        }
      ]
    )
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sarah Johnson</Text>
        <TouchableOpacity onPress={() => {
          Alert.alert(
            'Options',
            'Choose an action',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Report User', onPress: handleReportUser },
              { text: 'Block User', style: 'destructive', onPress: handleBlockUser }
            ]
          )
        }}>
          <Text style={styles.optionsButton}>⋯</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={MessageItem}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[styles.sendButton, { opacity: newMessage.trim() ? 1 : 0.5 }]}
          onPress={sendMessage}
          disabled={!newMessage.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  backButton: { fontSize: 24, color: '#FF6B6B' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  optionsButton: { fontSize: 24, color: '#666' },
  messagesList: { paddingHorizontal: 16, paddingVertical: 8 },
  messageContainer: { marginVertical: 4 },
  myMessage: { alignItems: 'flex-end' },
  otherMessage: { alignItems: 'flex-start' },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20
  },
  myBubble: {
    backgroundColor: '#FF6B6B',
    borderBottomRightRadius: 6
  },
  otherBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 6,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  messageText: { fontSize: 16, lineHeight: 22 },
  myMessageText: { color: '#fff' },
  otherMessageText: { color: '#222' },
  messageTime: { fontSize: 12, marginTop: 4 },
  myMessageTime: { color: 'rgba(255,255,255,0.8)', textAlign: 'right' },
  otherMessageTime: { color: '#999' },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'flex-end'
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    fontSize: 16,
    maxHeight: 100
  },
  sendButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20
  },
  sendButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
})