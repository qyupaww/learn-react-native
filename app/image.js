import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { getProfile } from '/utils/auth';

export default function UserProfile() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const profileData = await getProfile();
      if (profileData) {
        setUserData({
          name: profileData.name || 'No Name',
          email: profileData.email || 'No Email'
        });
      } else {
        setError('Failed to load profile data');
      }
    } catch (err) {
      setError('Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.content}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.content}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/EULA.jpg')}
          style={styles.circularImage}
        />
      </View>
      
      <View style={styles.userInfoContainer}>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    marginVertical: 20,
  },
  circularImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ddd',
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  }
});