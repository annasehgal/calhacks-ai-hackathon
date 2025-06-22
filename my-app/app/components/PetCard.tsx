import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

type PetCardProps = {
  id: string
  name?: string
  species: string
  breed?: string
  color: string
  location: string
  date: string
  image: string
  type: 'lost' | 'found'
  reward?: string
  onPress: () => void
}

export default function PetCard({ 
  name, 
  species, 
  breed, 
  color, 
  location, 
  date, 
  image, 
  type, 
  reward, 
  onPress 
}: PetCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          {name ? (
            <Text style={styles.name}>{name}</Text>
          ) : (
            <Text style={styles.species}>{species}</Text>
          )}
          {reward && (
            <View style={styles.rewardBadge}>
              <Text style={styles.rewardText}>{reward}</Text>
            </View>
          )}
          <View style={[styles.typeBadge, { backgroundColor: type === 'lost' ? '#FF6B6B' : '#4CAF50' }]}>
            <Text style={styles.typeText}>{type.toUpperCase()}</Text>
          </View>
        </View>
        
        {breed && <Text style={styles.breed}>{breed}</Text>}
        <Text style={styles.color}>Color: {color}</Text>
        <Text style={styles.location}>📍 {location}</Text>
        <Text style={styles.date}>
          {type === 'lost' ? 'Last seen:' : 'Found:'} {date}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
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
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0'
  },
  content: {
    flex: 1,
    padding: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    flex: 1
  },
  species: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    flex: 1
  },
  breed: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4
  },
  color: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4
  },
  location: {
    fontSize: 14,
    color: '#FF6B6B',
    marginBottom: 4
  },
  date: {
    fontSize: 12,
    color: '#999'
  },
  rewardBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8
  },
  rewardText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  typeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold'
  }
})