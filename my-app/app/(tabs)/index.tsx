import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native'
import { useRouter } from 'expo-router'
import PetForm from '../components/PetForm'
import PetCard from '../components/PetCard'
import type { Pet, RecentActivity, DashboardStats, PetFormData } from '../types'

// Mock data for demonstration
const mockStats: DashboardStats = {
  totalLost: 127,
  totalFound: 89,
  totalReunited: 45,
  myReports: 3,
  myMessages: 7
}

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'lost',
    petName: 'Buddy',
    location: 'Central Park, NYC',
    timestamp: '2h ago',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300',
    userId: 'user1'
  },
  {
    id: '2',
    type: 'found',
    petName: 'Unknown Cat',
    location: 'Brooklyn Bridge',
    timestamp: '4h ago',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300',
    userId: 'user2'
  },
  {
    id: '3',
    type: 'reunited',
    petName: 'Luna',
    location: 'Queens',
    timestamp: '1d ago',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300',
    userId: 'user3'
  }
]

const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    color: 'Golden',
    description: 'Friendly golden retriever, wearing a blue collar',
    images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=300'],
    contactInfo: 'john@email.com',
    location: 'Central Park, NYC',
    date: '2024-06-20',
    type: 'lost',
    reward: '$200',
    status: 'active'
  },
  {
    id: '2',
    species: 'Cat',
    breed: 'Tabby',
    color: 'Orange and white',
    description: 'Found wandering near the subway station',
    images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300'],
    contactInfo: 'jane@email.com',
    location: 'Brooklyn Bridge',
    date: '2024-06-21',
    type: 'found',
    status: 'active'
  }
]

export default function HomeScreen() {
  const router = useRouter()
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportType, setReportType] = useState<'lost' | 'found'>('lost')

  const handleReportLost = () => {
    setReportType('lost')
    setShowReportModal(true)
  }

  const handleReportFound = () => {
    setReportType('found')
    setShowReportModal(true)
  }

  const handleFormSubmit = (data: PetFormData) => {
    // Handle form submission here
    console.log('Form submitted:', data)
    setShowReportModal(false)
    // You would typically send this data to your backend
  }

  const handlePetPress = (pet: Pet) => {
    // Corrected navigation path to match the defined route for chat/[id]
    router.push(`/chat/${pet.id}`)
  }

  const handleViewAllLost = () => {
    router.push('/(tabs)/lost')
  }

  const handleViewAllFound = () => {
    router.push('/(tabs)/found')
  }

  const renderActivityIcon = (type: string) => {
    switch (type) {
      case 'lost': return '😢'
      case 'found': return '🎉'
      case 'reunited': return '❤️'
      default: return '📱'
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Pet Finder</Text>
          <Text style={styles.subtitle}>Helping reunite pets with their families</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={[styles.actionButton, styles.lostButton]} onPress={handleReportLost}>
            <Text style={styles.actionButtonText}>😢 Report Lost Pet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.foundButton]} onPress={handleReportFound}>
            <Text style={styles.actionButtonText}>🎉 Report Found Pet</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{mockStats.totalLost}</Text>
            <Text style={styles.statLabel}>Lost Pets</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{mockStats.totalFound}</Text>
            <Text style={styles.statLabel}>Found Pets</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, styles.successNumber]}>{mockStats.totalReunited}</Text>
            <Text style={styles.statLabel}>Reunited</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {mockRecentActivity.map(activity => (
            <View key={activity.id} style={styles.activityItem}>
              <Text style={styles.activityIcon}>{renderActivityIcon(activity.type)}</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>
                  <Text style={styles.activityType}>{activity.type.toUpperCase()}</Text>: {activity.petName}
                </Text>
                <Text style={styles.activityLocation}>📍 {activity.location}</Text>
              </View>
              <Text style={styles.activityTime}>{activity.timestamp}</Text>
            </View>
          ))}
        </View>

        {/* Recent Lost Pets */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Lost Pets</Text>
            <TouchableOpacity onPress={handleViewAllLost}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {mockPets
            .filter(pet => pet.type === 'lost')
            .slice(0, 2)
            .map(pet => (
              <PetCard
                key={pet.id}
                id={pet.id}
                name={pet.name}
                species={pet.species}
                breed={pet.breed}
                color={pet.color}
                location={pet.location}
                date={pet.date}
                image={pet.images[0]}
                type={pet.type}
                reward={pet.reward}
                onPress={() => handlePetPress(pet)}
              />
            ))}
        </View>

        {/* Recent Found Pets */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Found Pets</Text>
            <TouchableOpacity onPress={handleViewAllFound}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {mockPets
            .filter(pet => pet.type === 'found')
            .slice(0, 2)
            .map(pet => (
              <PetCard
                key={pet.id}
                id={pet.id}
                name={pet.name}
                species={pet.species}
                breed={pet.breed}
                color={pet.color}
                location={pet.location}
                date={pet.date}
                image={pet.images[0]}
                type={pet.type}
                onPress={() => handlePetPress(pet)}
              />
            ))}
        </View>
      </ScrollView>

      {/* Report Pet Modal */}
      <Modal
        visible={showReportModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <PetForm
          type={reportType}
          onClose={() => setShowReportModal(false)}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  scrollView: {
    flex: 1
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 16,
    color: '#666'
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  lostButton: {
    backgroundColor: '#FF6B6B'
  },
  foundButton: {
    backgroundColor: '#4CAF50'
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 12,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4
  },
  successNumber: {
    color: '#4CAF50'
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center'
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222'
  },
  viewAllText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600'
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 12
  },
  activityContent: {
    flex: 1
  },
  activityText: {
    fontSize: 16,
    color: '#222',
    marginBottom: 2
  },
  activityType: {
    fontWeight: 'bold'
  },
  activityLocation: {
    fontSize: 14,
    color: '#666'
  },
  activityTime: {
    fontSize: 12,
    color: '#999'
  }
})