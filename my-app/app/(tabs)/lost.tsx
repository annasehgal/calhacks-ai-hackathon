import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import PetForm from '../components/PetForm'

type LostPet = {
  id: string
  name: string
  breed: string
  color: string
  lastSeen: string
  location: string
  description: string
  image: string
  contactInfo: string
  reward?: string
}

const mockLostPets: LostPet[] = [
  {
    id: '1',
    name: 'Max',
    breed: 'Golden Retriever',
    color: 'Golden',
    lastSeen: '2025-06-20',
    location: 'Central Park, NYC',
    description: 'Friendly dog, wearing blue collar with name tag',
    image: 'https://place-puppy.com/300x300',
    contactInfo: 'john@email.com',
    reward: '$200'
  },
  {
    id: '2',
    name: 'Luna',
    breed: 'Siamese Cat',
    color: 'Cream and Brown',
    lastSeen: '2025-06-21',
    location: 'Brooklyn Heights',
    description: 'Indoor cat, very shy, blue eyes',
    image: 'https://placekitten.com/300/300',
    contactInfo: 'sarah@email.com'
  }
]

export default function LostPet() {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [selectedPet, setSelectedPet] = useState<LostPet | null>(null)

  const handleContactOwner = (pet: LostPet) => {
    // TODO: Navigate to chat or contact form
    console.log('Contacting owner for pet:', pet.name)
  }

  const PetCard = ({ item }: { item: LostPet }) => (
    <TouchableOpacity 
      style={styles.petCard}
      onPress={() => setSelectedPet(item)}
    >
      <Image source={{ uri: item.image }} style={styles.petImage} />
      <View style={styles.petInfo}>
        <View style={styles.petHeader}>
          <Text style={styles.petName}>{item.name}</Text>
          {item.reward && (
            <View style={styles.rewardBadge}>
              <Text style={styles.rewardText}>{item.reward}</Text>
            </View>
          )}
        </View>
        <Text style={styles.petBreed}>{item.breed} • {item.color}</Text>
        <Text style={styles.petLocation}>📍 {item.location}</Text>
        <Text style={styles.petDate}>Last seen: {item.lastSeen}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lost Pets</Text>
        <TouchableOpacity 
          style={styles.reportButton}
          onPress={() => setShowForm(true)}
        >
          <Text style={styles.reportButtonText}>+ Report Lost Pet</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockLostPets}
        keyExtractor={item => item.id}
        renderItem={PetCard}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* Pet Details Modal */}
      <Modal visible={!!selectedPet} animationType="slide" presentationStyle="pageSheet">
        {selectedPet && (
          <ScrollView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedPet(null)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <Image source={{ uri: selectedPet.image }} style={styles.modalImage} />
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedPet.name}</Text>
              <Text style={styles.modalBreed}>{selectedPet.breed} • {selectedPet.color}</Text>
              <Text style={styles.modalLocation}>📍 Last seen: {selectedPet.location}</Text>
              <Text style={styles.modalDate}>Date: {selectedPet.lastSeen}</Text>
              {selectedPet.reward && (
                <Text style={styles.modalReward}>💰 Reward: {selectedPet.reward}</Text>
              )}
              <Text style={styles.modalDescription}>{selectedPet.description}</Text>
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => handleContactOwner(selectedPet)}
              >
                <Text style={styles.contactButtonText}>Contact Owner</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Modal>

      {/* Report Form Modal */}
      <Modal visible={showForm} animationType="slide" presentationStyle="pageSheet">
        <PetForm 
          type="lost"
          onClose={() => setShowForm(false)}
          onSubmit={(data) => {
            console.log('Lost pet report:', data)
            setShowForm(false)
          }}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingTop: 60, 
    paddingHorizontal: 20, 
    paddingBottom: 20 
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#222' },
  reportButton: { 
    backgroundColor: '#FF6B6B', 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 20 
  },
  reportButtonText: { color: '#fff', fontWeight: 'bold' },
  list: { paddingHorizontal: 20 },
  petCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  petImage: { width: 100, height: 100 },
  petInfo: { flex: 1, padding: 16 },
  petHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  petName: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  rewardBadge: { backgroundColor: '#4CAF50', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  rewardText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  petBreed: { fontSize: 14, color: '#666', marginTop: 4 },
  petLocation: { fontSize: 14, color: '#FF6B6B', marginTop: 4 },
  petDate: { fontSize: 12, color: '#999', marginTop: 4 },
  modalContainer: { flex: 1, backgroundColor: '#fff' },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    padding: 20, 
    paddingTop: 60 
  },
  closeButton: { fontSize: 24, color: '#666' },
  modalImage: { width: '100%', height: 300 },
  modalContent: { padding: 20 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#222' },
  modalBreed: { fontSize: 16, color: '#666', marginTop: 4 },
  modalLocation: { fontSize: 16, color: '#FF6B6B', marginTop: 8 },
  modalDate: { fontSize: 14, color: '#666', marginTop: 4 },
  modalReward: { fontSize: 16, color: '#4CAF50', marginTop: 8, fontWeight: 'bold' },
  modalDescription: { fontSize: 16, color: '#444', marginTop: 16, lineHeight: 24 },
  contactButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24
  },
  contactButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
})