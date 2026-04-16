import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function InputBar({ text, onChangeText, onSizeChange, onSendPressed, placeholder = 'Send a message' }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.inputBar}>
        <TextInput
          style={styles.textBox}
          multiline
          onChangeText={onChangeText}
          onContentSizeChange={onSizeChange}
          value={text}
          placeholder={placeholder}
          placeholderTextColor="#9b8c80"
        />
        <TouchableOpacity style={styles.sendButton} onPress={onSendPressed} activeOpacity={0.85}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#fff8f2',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f0d6c1',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  textBox: {
    flex: 1,
    maxHeight: 110,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#23160f',
  },
  sendButton: {
    backgroundColor: '#da6b2c',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginLeft: 8,
  },
  sendText: {
    color: 'white',
    fontWeight: '800',
  },
});
