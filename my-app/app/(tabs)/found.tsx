import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image, ScrollView } from 'react-native'
import { Video, ResizeMode } from 'expo-av'
import PetForm from '../components/PetForm'

type FoundPet = {
  id: string
  species: string
  breed?: string
  color: string
  foundDate: string
  location: string
  description: string
  image: string
  videoUrl?: string
  contactInfo: string
}

const mockFoundPets: FoundPet[] = [
  {
    id: '1',
    species: 'Dog',
    breed: 'Golden Retriever',
    color: 'Golden',
    foundDate: '2025-06-21',
    location: 'Central Park, NYC',
    description: 'Found wandering near the lake, very friendly, wearing blue collar',
    image: 'https://place-puppy.com/300x300',
    videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny_720p_1mb.mp4',
    contactInfo: 'jane@email.com'
  },
  {
    id: '2',
    species: 'Cat',
    color: 'Orange and White',
    foundDate: '2025-06-20',
    location: 'Brooklyn Heights',
    description: 'Found hiding under car, seems domesticated, no collar',
    image: 'https://placekitten.com/300/300',
    contactInfo: 'mike@email.com'
  }
]

export default function FoundPet() {
  const [showForm, setShowForm] = useState(false)
  const [selectedPet, setSelectedPet] = useState<FoundPet | null>(null)

  const handleClaimPet = (pet: FoundPet) => {
    // TODO: Navigate to claim process
    console.log('Claiming pet:', pet.id)
  }

  const PetCard = ({ item }: { item: FoundPet }) => (
    <TouchableOpacity 
      style={styles.petCard}
      onPress={() => setSelectedPet(item)}
    >
      <Image source={{ uri: item.image }} style={styles.petImage} />
      <View style={styles.petInfo}>
        <Text style={styles.petSpecies}>{item.species}</Text>
        {item.breed && <Text style={styles.petBreed}>{item.breed}</Text>}
        <Text style={styles.petColor}>{item.color}</Text>
        <Text style={styles.petLocation}>📍 {item.location}</Text>
        <Text style={styles.petDate}>Found: {item.foundDate}</Text>
        {item.videoUrl && (
          <Text style={styles.videoIndicator}>🎥 Video available</Text>
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Found Pets</Text>
        <TouchableOpacity 
          style={styles.reportButton}
          onPress={() => setShowForm(true)}
        >
          <Text style={styles.reportButtonText}>+ Report Found Pet</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockFoundPets}
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
            {selectedPet.videoUrl && (
              <Video
                source={{ uri: selectedPet.videoUrl }}
                style={styles.video}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping={false}
              />
            )}
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedPet.species}</Text>
              {selectedPet.breed && (
                <Text style={styles.modalBreed}>{selectedPet.breed}</Text>
              )}
              <Text style={styles.modalColor}>Color: {selectedPet.color}</Text>
              <Text style={styles.modalLocation}>📍 Found at: {selectedPet.location}</Text>
              <Text style={styles.modalDate}>Date: {selectedPet.foundDate}</Text>
              <Text style={styles.modalDescription}>{selectedPet.description}</Text>
              <TouchableOpacity 
                style={styles.claimButton}
                onPress={() => handleClaimPet(selectedPet)}
              >
                <Text style={styles.claimButtonText}>This is My Pet!</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Modal>

      {/* Report Form Modal */}
      <Modal visible={showForm} animationType="slide" presentationStyle="pageSheet">
        <PetForm 
          type="found"
          onClose={() => setShowForm(false)}
          onSubmit={(data) => {
            console.log('Found pet report:', data)
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
    backgroundColor: '#4CAF50', 
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
  petSpecies: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  petBreed: { fontSize: 14, color: '#666', marginTop: 2 },
  petColor: { fontSize: 14, color: '#666', marginTop: 4 },
  petLocation: { fontSize: 14, color: '#4CAF50', marginTop: 4 },
  petDate: { fontSize: 12, color: '#999', marginTop: 4 },
  videoIndicator: { fontSize: 12, color: '#2196F3', marginTop: 4 },
  modalContainer: { flex: 1, backgroundColor: '#fff' },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    padding: 20, 
    paddingTop: 60 
  },
  closeButton: { fontSize: 24, color: '#666' },
  modalImage: { width: '100%', height: 250 },
  video: { width: '100%', height: 200, backgroundColor: '#000' },
  modalContent: { padding: 20 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#222' },
  modalBreed: { fontSize: 16, color: '#666', marginTop: 4 },
  modalColor: { fontSize: 16, color: '#666', marginTop: 4 },
  modalLocation: { fontSize: 16, color: '#4CAF50', marginTop: 8 },
  modalDate: { fontSize: 14, color: '#666', marginTop: 4 },
  modalDescription: { fontSize: 16, color: '#444', marginTop: 16, lineHeight: 24 },
  claimButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24
  },
  claimButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
})