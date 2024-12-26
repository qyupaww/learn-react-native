import React, { useEffect, useState } from 'react';
import { View, Text, Image, useWindowDimensions, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchDetailArticle, fetchArticleComments } from '@/utils/api';
import RenderHtml from 'react-native-render-html';

const ArticleDetails = () => {
  const { id } = useLocalSearchParams();
  const [article, setArticle] = useState({ title: '', cover_image: '', body_html: '' });
  const [comments, setComments] = useState([]);
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetchDetailArticle(id)
      .then((data) => setArticle(data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    fetchArticleComments(id)
      .then((data) => setComments(data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      {article.cover_image && (
        <Image
          source={{ uri: article.cover_image }}
          style={[styles.coverImage, { width }]}
        />
      )}
      <RenderHtml
        containerWidth={width}
        source={{ html: article.body_html }}
      />
      <Text>Komen</Text>
      <View style={styles.commentsSection}>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </View>
    </ScrollView>
  );
};

const Comment = ({ comment }) => {
  return (
    <View style={styles.commentContainer}>
      <Text style={styles.commentAuthor}>{comment.user.name}</Text>
      <RenderHtml
        containerWidth={useWindowDimensions().width}
        source={{ html: comment.body_html }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  coverImage: {
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  commentsSection: {
    marginTop: 20,
  },
  commentContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ArticleDetails;
