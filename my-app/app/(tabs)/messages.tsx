import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { useRouter } from 'expo-router'

type DMItem = {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unreadCount?: number
  avatar: string
  petType: string
}

const mockDMs: DMItem[] = [
  { 
    id: '1', 
    name: 'Sarah Johnson', 
    lastMessage: 'I saw your dog near Elm Street around 3 PM', 
    timestamp: '2h ago',
    unreadCount: 2,
    avatar: 'https://i.pravatar.cc/150?img=1',
    petType: 'Golden Retriever'
  },
  { 
    id: '2', 
    name: 'Mark Davis', 
    lastMessage: 'Is this your cat? Found near the park', 
    timestamp: '5h ago',
    avatar: 'https://i.pravatar.cc/150?img=2',
    petType: 'Orange Tabby'
  },
  { 
    id: '3', 
    name: 'Jessica Miller', 
    lastMessage: 'I can keep the dog safe until you arrive', 
    timestamp: '1d ago',
    avatar: 'https://i.pravatar.cc/150?img=3',
    petType: 'Beagle'
  },
  { 
    id: '4', 
    name: 'Alex Chen', 
    lastMessage: 'Thank you so much for finding Luna!', 
    timestamp: '2d ago',
    avatar: 'https://i.pravatar.cc/150?img=4',
    petType: 'Siamese Cat'
  }
]

export default function Messages() {
  const router = useRouter()

  const DMItem = ({ item }: { item: DMItem }) => (
    <TouchableOpacity 
      style={styles.dmItem} 
      onPress={() => router.push(`/chat/${item.id}`)}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.unreadCount && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.petType}>About: {item.petType}</Text>
        <Text style={styles.lastMessage} numberOfLines={2}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>
      
      {mockDMs.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No messages yet</Text>
          <Text style={styles.emptySubtitle}>
            Messages will appear here when someone contacts you about a pet
          </Text>
        </View>
      ) : (
        <FlatList
          data={mockDMs}
          keyExtractor={item => item.id}
          renderItem={DMItem}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { 
    paddingTop: 60, 
    paddingHorizontal: 20, 
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#222' },
  messagesList: { paddingTop: 8 },
  dmItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  avatarContainer: { position: 'relative', marginRight: 12 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  unreadBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  unreadText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  messageContent: { flex: 1 },
  messageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userName: { fontSize: 16, fontWeight: '600', color: '#222' },
  timestamp: { fontSize: 12, color: '#999' },
  petType: { fontSize: 12, color: '#666', marginTop: 2 },
  lastMessage: { fontSize: 14, color: '#444', marginTop: 4, lineHeight: 20 },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40
  },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#666', marginBottom: 8 },
  emptySubtitle: { fontSize: 16, color: '#999', textAlign: 'center', lineHeight: 24 }
})