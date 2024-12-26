import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Bebas() {
  const router = useRouter();

  return (

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/EULA.jpg')}
            style={styles.circularImage}
          />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});