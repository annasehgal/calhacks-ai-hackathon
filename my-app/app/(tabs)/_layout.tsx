import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function TabLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Tabs 
        screenOptions={{ 
          tabBarActiveTintColor: '#FF6B6B',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopColor: '#eee',
            paddingBottom: 5,
            height: 85
          }
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="lost"
          options={{
            title: 'Lost',
            headerShown: false,
            tabBarIcon: ({ color, size }) => <FontAwesome name="search" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="found"
          options={{
            title: 'Spotted Pets',
            headerShown: false,
            tabBarIcon: ({ color, size }) => <FontAwesome name="camera" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: 'Messages',
            headerShown: false,
            tabBarIcon: ({ color, size }) => <FontAwesome name="envelope" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
          }}
        />
      </Tabs>
    </>
  )
}