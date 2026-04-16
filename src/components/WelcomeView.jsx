import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputBar from './InputBar';

const quickActions = [
  'Classic Burger',
  'Pepperoni Pizza',
  'Burger please',
  'Pizza please',
];

export default function WelcomeView({ scrollToBottom, sendMessage, setInputBarText, inputBarText, submitText }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
          }}
          imageStyle={styles.heroImage}
          style={styles.hero}
        >
          <View style={styles.overlay}>
            <Text style={styles.kicker}>FAST PICKUP ORDERING</Text>
            <Text style={styles.title}>Order dinner in seconds with our food chatbot</Text>
            <Text style={styles.subtitle}>
              Choose a burger or pizza combo, add a quick upsell, and place your order right in the chat.
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Popular quick starts</Text>
          <Text style={styles.cardText}>Tap one of these sample actions to begin your order.</Text>

          <View style={styles.buttonGrid}>
            {quickActions.map((label) => (
              <TouchableOpacity key={label} style={styles.quickButton} onPress={() => submitText(label)}>
                <Text style={styles.quickButtonText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.menuPreview}>
            <View style={styles.menuItem}>
              <Text style={styles.menuName}>Classic Burger</Text>
              <Text style={styles.menuMeta}>Main item • $8.99</Text>
              <Text style={styles.menuMeta}>Upsell: seasoned fries</Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuName}>Pepperoni Pizza Slice Combo</Text>
              <Text style={styles.menuMeta}>Main item • $9.99</Text>
              <Text style={styles.menuMeta}>Upsell: garlic dip</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <InputBar
        onSendPressed={sendMessage}
        onSizeChange={() => scrollToBottom(false)}
        onChangeText={setInputBarText}
        text={inputBarText}
        placeholder="Type burger or pizza to start your order"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    padding: 18,
    paddingBottom: 10,
  },
  hero: {
    minHeight: 330,
    borderRadius: 22,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    marginBottom: 18,
  },
  heroImage: {
    borderRadius: 22,
  },
  overlay: {
    backgroundColor: 'rgba(34, 22, 12, 0.52)',
    padding: 22,
  },
  kicker: {
    color: '#ffd9bd',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.3,
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 10,
  },
  subtitle: {
    color: '#fff4ea',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#23160f',
  },
  cardText: {
    fontSize: 14,
    color: '#6c5647',
    marginTop: 6,
    marginBottom: 14,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  quickButton: {
    backgroundColor: '#fff1e6',
    borderColor: '#f4c8a7',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  quickButtonText: {
    color: '#9a4f1d',
    fontWeight: '700',
    fontSize: 13,
  },
  menuPreview: {
    gap: 12,
  },
  menuItem: {
    backgroundColor: '#fff8f2',
    borderRadius: 16,
    padding: 14,
  },
  menuName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#23160f',
    marginBottom: 4,
  },
  menuMeta: {
    fontSize: 13,
    color: '#6c5647',
    lineHeight: 18,
  },
});
