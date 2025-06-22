// Pet related types
export type Pet = {
  id: string
  name?: string
  species: string
  breed?: string
  color: string
  description: string
  images: string[]
  contactInfo: string
  location: string
  date: string
  type: 'lost' | 'found'
  reward?: string
  status: 'active' | 'reunited' | 'closed'
}

export type LostPet = Pet & {
  type: 'lost'
  name: string
  lastSeen: string
}

export type FoundPet = Pet & {
  type: 'found'
  foundDate: string
  videoUrl?: string
}

// User and profile types
export type UserProfile = {
  id: string
  name: string
  email: string
  phone: string
  location: string
  avatar: string
  petsReported: number
  petsFound: number
  successfulReunions: number
  joinDate: string
  isVerified: boolean
}

// Message and chat types
export type Message = {
  id: string
  text: string
  senderId: string
  receiverId: string
  timestamp: string
  isRead: boolean
  messageType: 'text' | 'image' | 'location'
  imageUrl?: string
  location?: {
    latitude: number
    longitude: number
    address?: string
  }
}

export type Chat = {
  id: string
  participants: string[]
  lastMessage: Message
  unreadCount: number
  petId?: string
  createdAt: string
  updatedAt: string
}

export type DMItem = {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unreadCount?: number
  avatar: string
  petType: string
}

// Activity and dashboard types
export type RecentActivity = {
  id: string
  type: 'lost' | 'found' | 'reunited'
  petName: string
  location: string
  timestamp: string
  image: string
  userId: string
}

export type DashboardStats = {
  totalLost: number
  totalFound: number
  totalReunited: number
  myReports: number
  myMessages: number
}

// Form data types
export type PetFormData = {
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

// Search and filter types
export type SearchFilters = {
  species?: string
  breed?: string
  color?: string
  location?: string
  dateRange?: {
    start: string
    end: string
  }
  hasReward?: boolean
  type: 'lost' | 'found' | 'all'
}

export type SearchResult = Pet & {
  distance?: number
  matchScore?: number
}

// Notification types
export type NotificationType = 
  | 'new_message'
  | 'pet_match'
  | 'pet_found'
  | 'reunion_confirmed'
  | 'system_update'

export type Notification = {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  isRead: boolean
  data?: {
    petId?: string
    chatId?: string
    userId?: string
    [key: string]: any
  }
}

// Location types
export type Location = {
  latitude: number
  longitude: number
  address?: string
  city?: string
  state?: string
  country?: string
}

// API response types
export type ApiResponse<T> = {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export type PaginatedResponse<T> = ApiResponse<{
  items: T[]
  totalCount: number
  page: number
  limit: number
  hasMore: boolean
}>

// Navigation types (for type-safe navigation)
export type TabParamList = {
  index: undefined
  lost: undefined
  found: undefined
  messages: undefined
  profile: undefined
}

export type RootStackParamList = {
  '(tabs)': undefined
  'chat/[id]': { id: string }
  'pet/[id]': { id: string }
  'search': { filters?: SearchFilters }
  'notifications': undefined
}

// Component prop types
export type PetCardProps = {
  pet: Pet
  onPress: (pet: Pet) => void
  showType?: boolean
}

export type ProfileHeaderProps = {
  name: string
  email: string
  avatar: string
  onEditPress: () => void
}

export type PetFormProps = {
  type: 'lost' | 'found'
  initialData?: Partial<PetFormData>
  onClose: () => void
  onSubmit: (data: PetFormData) => void
}

// Error types
export type AppError = {
  code: string
  message: string
  details?: any
}

// Theme and styling types
export type Theme = {
  colors: {
    primary: string
    secondary: string
    success: string
    warning: string
    error: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
  }
  spacing: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
  borderRadius: {
    sm: number
    md: number
    lg: number
    full: number
  }
}