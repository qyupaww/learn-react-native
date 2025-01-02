import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { getToken, removeToken, getUsernameFromToken } from '@/utils/auth';

const Navbar = () => {
  const [jwtToken, setJwtToken] = useState(null);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await getToken();
      setJwtToken(token);

      if (token) {
        const fetchedUsername = await getUsernameFromToken();
        setUsername(fetchedUsername || 'User'); 
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await removeToken(); 
    setJwtToken(null); 
    setUsername(''); 
    router.push('/login');
  };

  return (
    <View style={styles.navbar}>
      <Text style={styles.logo} onPress={() => router.push('/')}>
        Blog App
      </Text>
      <View style={styles.navItems}>
        {jwtToken ? (
          <>
            <Text style={styles.username}>Welcome, {username}!</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/details/create')} style={styles.popupItem}>
            <Text style={styles.popupText}>Buat Article</Text>
          </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginRight: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'yellow',
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Navbar;
