import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

type PetFormData = {
  name?: string
  species: string
  breed?: string
  color: string
  location: string
  date: string
  description: string
  contactInfo: string
  reward?: string
  images: string[]
}

type PetFormProps = {
  type: 'lost' | 'found'
  onClose: () => void
  onSubmit: (data: PetFormData) => void
}

export default function PetForm({ type, onClose, onSubmit }: PetFormProps) {
  const [formData, setFormData] = useState<PetFormData>({
    name: '',
    species: '',
    breed: '',
    color: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    contactInfo: '',
    reward: '',
    images: []
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.species.trim()) newErrors.species = 'Species is required'
    if (!formData.color.trim()) newErrors.color = 'Color is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.contactInfo.trim()) newErrors.contactInfo = 'Contact info is required'
    if (type === 'lost' && !formData.name?.trim()) newErrors.name = 'Pet name is required for lost pets'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, result.assets[0].uri]
      }))
    }
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const updateField = (field: keyof PetFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          Report {type === 'lost' ? 'Lost' : 'Found'} Pet
        </Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.submitButton}>Submit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.form}>
        {type === 'lost' && (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Pet Name *</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              value={formData.name}
              onChangeText={(text) => updateField('name', text)}
              placeholder="Enter pet's name"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
        )}

        <View style={styles.formGroup}>
          <Text style={styles.label}>Species *</Text>
          <TextInput
            style={[styles.input, errors.species && styles.inputError]}
            value={formData.species}
            onChangeText={(text) => updateField('species', text)}
            placeholder="e.g., Dog, Cat, Bird"
          />
          {errors.species && <Text style={styles.errorText}>{errors.species}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Breed</Text>
          <TextInput
            style={styles.input}
            value={formData.breed}
            onChangeText={(text) => updateField('breed', text)}
            placeholder="e.g., Golden Retriever, Siamese"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Color *</Text>
          <TextInput
            style={[styles.input, errors.color && styles.inputError]}
            value={formData.color}
            onChangeText={(text) => updateField('color', text)}
            placeholder="Describe the color/markings"
          />
          {errors.color && <Text style={styles.errorText}>{errors.color}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            {type === 'lost' ? 'Last Seen Location' : 'Found Location'} *
          </Text>
          <TextInput
            style={[styles.input, errors.location && styles.inputError]}
            value={formData.location}
            onChangeText={(text) => updateField('location', text)}
            placeholder="e.g., Central Park, NYC"
          />
          {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            {type === 'lost' ? 'Date Last Seen' : 'Date Found'} *
          </Text>
          <TextInput
            style={[styles.input, errors.date && styles.inputError]}
            value={formData.date}
            onChangeText={(text) => updateField('date', text)}
            placeholder="YYYY-MM-DD"
          />
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.textArea, errors.description && styles.inputError]}
            value={formData.description}
            onChangeText={(text) => updateField('description', text)}
            placeholder="Describe the pet, behavior, collar, etc."
            multiline
            numberOfLines={4}
          />
          {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Contact Information *</Text>
          <TextInput
            style={[styles.input, errors.contactInfo && styles.inputError]}
            value={formData.contactInfo}
            onChangeText={(text) => updateField('contactInfo', text)}
            placeholder="Email or phone number"
          />
          {errors.contactInfo && <Text style={styles.errorText}>{errors.contactInfo}</Text>}
        </View>

        {type === 'lost' && (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Reward (Optional)</Text>
            <TextInput
              style={styles.input}
              value={formData.reward}
              onChangeText={(text) => updateField('reward', text)}
              placeholder="e.g., $200"
            />
          </View>
        )}

        <View style={styles.formGroup}>
          <Text style={styles.label}>Photos</Text>
          <TouchableOpacity style={styles.imageButton} onPress={handleImagePicker}>
            <Text style={styles.imageButtonText}>+ Add Photo</Text>
          </TouchableOpacity>
          
          {formData.images.length > 0 && (
            <View style={styles.imageContainer}>
              {formData.images.map((uri, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeImage}
                    onPress={() => setFormData(prev => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index)
                    }))}
                  >
                    <Text style={styles.removeImageText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  cancelButton: { color: '#666', fontSize: 16 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  submitButton: { color: '#FF6B6B', fontSize: 16, fontWeight: 'bold' },
  form: { flex: 1, paddingHorizontal: 20 },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#222', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 100,
    textAlignVertical: 'top'
  },
  inputError: { borderColor: '#FF6B6B' },
  errorText: { color: '#FF6B6B', fontSize: 14, marginTop: 4 },
  imageButton: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#f8f9fa'
  },
  imageButtonText: { color: '#666', fontSize: 16 },
  imageContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 },
  imageWrapper: { position: 'relative', marginRight: 12, marginBottom: 12 },
  image: { width: 80, height: 80, borderRadius: 8 },
  removeImage: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  removeImageText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
})