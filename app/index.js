import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { fetchArticles } from "@/utils/api";
import { useRouter } from "expo-router";
import ArticleCard from "@/components/Article/ArticleCard";

const Index = () => {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchArticles()
      .then((data) => {
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          console.error('Invalid data format');
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.aboutButton}
          onPress={() => router.push("/about")}
        >
          <Text style={styles.aboutButtonText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={() => router.push("/image")}
        >
          <Text style={styles.imageButtonText}>Profil</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search ..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aboutButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  aboutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageButton: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  imageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  searchInput: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
});

export default Index;
