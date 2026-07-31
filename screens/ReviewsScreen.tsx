import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';
import { ReviewsScreenProps } from '../navigation/AppNavigator';

type Review = {
  id: string;
  reviewerName: string;
  rating: number;
  reviewText: string;
  theaterName: string;
};

export default function ReviewsScreen({
  route,
}: ReviewsScreenProps) {
  const theaterName =
    route.params?.theaterName ?? 'General Theater Review';

  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');

  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReviewId, setEditingReviewId] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const reviewsQuery = query(
      collection(db, 'reviews'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        const loadedReviews: Review[] = snapshot.docs.map(
          (reviewDocument) => {
            const data = reviewDocument.data();

            return {
              id: reviewDocument.id,
              reviewerName: data.reviewerName ?? 'Anonymous',
              rating: data.rating ?? 0,
              reviewText: data.reviewText ?? '',
              theaterName:
                data.theaterName ?? 'Unknown Theater',
            };
          }
        );

        setReviews(loadedReviews);
        setLoading(false);
      },
      (error) => {
        console.error('Review loading error:', error);

        Alert.alert(
          'Firebase error',
          'The reviews could not be loaded. Check your Firebase configuration and Firestore rules.'
        );

        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  function validateForm() {
    if (
      !reviewerName.trim() ||
      !rating.trim() ||
      !reviewText.trim()
    ) {
      Alert.alert(
        'Missing information',
        'Complete your name, rating, and written review.'
      );

      return false;
    }

    const numericRating = Number(rating);

    if (
      Number.isNaN(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      Alert.alert(
        'Invalid rating',
        'Enter a rating between 1 and 5.'
      );

      return false;
    }

    return true;
  }

  function clearForm() {
    setReviewerName('');
    setRating('');
    setReviewText('');
    setEditingReviewId(null);
  }

  async function saveReview() {
    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      const reviewData = {
        reviewerName: reviewerName.trim(),
        rating: Number(rating),
        reviewText: reviewText.trim(),
        theaterName,
      };

      if (editingReviewId) {
        await updateDoc(
          doc(db, 'reviews', editingReviewId),
          {
            ...reviewData,
            updatedAt: serverTimestamp(),
          }
        );

        Alert.alert(
          'Review updated',
          'Your changes were saved to Firebase.'
        );
      } else {
        await addDoc(collection(db, 'reviews'), {
          ...reviewData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        Alert.alert(
          'Review submitted',
          'Your review was saved to Firebase.'
        );
      }

      clearForm();
    } catch (error) {
      console.error('Review save error:', error);

      Alert.alert(
        'Save failed',
        'The review could not be saved. Check your internet connection and Firestore rules.'
      );
    } finally {
      setSaving(false);
    }
  }

  function beginEditing(review: Review) {
    setReviewerName(review.reviewerName);
    setRating(String(review.rating));
    setReviewText(review.reviewText);
    setEditingReviewId(review.id);
  }

  function confirmDelete(reviewId: string) {
    Alert.alert(
      'Delete review',
      'Are you sure you want to permanently delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteReview(reviewId),
        },
      ]
    );
  }

  async function deleteReview(reviewId: string) {
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));

      if (editingReviewId === reviewId) {
        clearForm();
      }

      Alert.alert(
        'Review deleted',
        'The review was removed from Firebase.'
      );
    } catch (error) {
      console.error('Review delete error:', error);

      Alert.alert(
        'Delete failed',
        'The review could not be deleted.'
      );
    }
  }

  function displayStars(reviewRating: number) {
    const filledStars = '★'.repeat(reviewRating);
    const emptyStars = '☆'.repeat(5 - reviewRating);

    return filledStars + emptyStars;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios' ? 'padding' : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          {editingReviewId
            ? 'Edit Review'
            : 'Write a Review'}
        </Text>

        <Text style={styles.theaterLabel}>
          Theater: {theaterName}
        </Text>

        <Text style={styles.label}>Your name</Text>

        <TextInput
          style={styles.input}
          value={reviewerName}
          onChangeText={setReviewerName}
          placeholder="Enter your name"
          placeholderTextColor="#8E8E8E"
        />

        <Text style={styles.label}>Rating</Text>

        <TextInput
          style={styles.input}
          value={rating}
          onChangeText={setRating}
          placeholder="Enter a number from 1 to 5"
          placeholderTextColor="#8E8E8E"
          keyboardType="numeric"
          maxLength={1}
        />

        <Text style={styles.label}>Review</Text>

        <TextInput
          style={[styles.input, styles.reviewInput]}
          value={reviewText}
          onChangeText={setReviewText}
          placeholder="Describe your theater experience"
          placeholderTextColor="#8E8E8E"
          multiline
          textAlignVertical="top"
        />

        <View style={styles.buttonContainer}>
          <Button
            title={
              saving
                ? 'Saving...'
                : editingReviewId
                ? 'Update Review'
                : 'Submit Review'
            }
            color="#B71C1C"
            onPress={saveReview}
            disabled={saving}
          />
        </View>

        {editingReviewId && (
          <View style={styles.cancelButtonContainer}>
            <Button
              title="Cancel Editing"
              color="#616161"
              onPress={clearForm}
            />
          </View>
        )}

        <Text style={styles.sectionTitle}>
          Firebase Reviews
        </Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color="#FFC107"
            />

            <Text style={styles.loadingText}>
              Loading reviews...
            </Text>
          </View>
        ) : reviews.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No reviews yet
            </Text>

            <Text style={styles.emptyText}>
              Submit the first review. It will appear here
              and inside your Firestore database.
            </Text>
          </View>
        ) : (
          reviews.map((review) => (
            <View
              key={review.id}
              style={styles.reviewCard}
            >
              <Text style={styles.reviewTheater}>
                {review.theaterName}
              </Text>

              <Text style={styles.reviewName}>
                {review.reviewerName}
              </Text>

              <Text style={styles.stars}>
                {displayStars(review.rating)}
              </Text>

              <Text style={styles.reviewBody}>
                {review.reviewText}
              </Text>

              <View style={styles.reviewActions}>
                <View style={styles.actionButton}>
                  <Button
                    title="Edit"
                    color="#9A6700"
                    onPress={() => beginEditing(review)}
                  />
                </View>

                <View style={styles.actionButton}>
                  <Button
                    title="Delete"
                    color="#B71C1C"
                    onPress={() =>
                      confirmDelete(review.id)
                    }
                  />
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  theaterLabel: {
    color: '#FFC107',
    fontSize: 16,
    marginBottom: 22,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  input: {
    backgroundColor: '#212121',
    borderColor: '#616161',
    borderWidth: 1,
    borderRadius: 10,
    color: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 17,
  },

  reviewInput: {
    minHeight: 125,
  },

  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },

  cancelButtonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 25,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 14,
  },

  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 35,
  },

  loadingText: {
    color: '#D0D0D0',
    marginTop: 12,
    fontSize: 15,
  },

  emptyCard: {
    backgroundColor: '#212121',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#424242',
  },

  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  emptyText: {
    color: '#D0D0D0',
    fontSize: 15,
    lineHeight: 21,
  },

  reviewCard: {
    backgroundColor: '#212121',
    borderRadius: 14,
    padding: 17,
    borderWidth: 1,
    borderColor: '#424242',
    marginBottom: 15,
  },

  reviewTheater: {
    color: '#FFC107',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  reviewName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  stars: {
    color: '#FFC107',
    fontSize: 19,
    marginVertical: 7,
  },

  reviewBody: {
    color: '#D0D0D0',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 15,
  },

  reviewActions: {
    flexDirection: 'row',
    gap: 10,
  },

  actionButton: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
});