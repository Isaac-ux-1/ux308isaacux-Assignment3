import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { handleInput } from '../Order';
import ChatView from './ChatView';
import WelcomeView from './WelcomeView';

export default function AIView() {
  const [messages, setMessages] = useState([]);
  const [inputBarText, setInputBarText] = useState('');
  const scrollViewRef = useRef(null);

  const scrollToBottom = (animated = true) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated });
    }, 100);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => scrollToBottom());
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => scrollToBottom());

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const submitText = (textToSend) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const newMessages = [{ direction: 'right', text: trimmed }];
    const responses = handleInput(trimmed);

    for (const message of responses) {
      newMessages.push({ direction: 'left', text: message });
    }

    setMessages((prev) => [...prev, ...newMessages]);
    setInputBarText('');
  };

  const sendMessage = () => submitText(inputBarText);

  return (
    <View style={styles.outer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.outer}>
        {messages.length ? (
          <ChatView
            scrollToBottom={scrollToBottom}
            sendMessage={sendMessage}
            scrollViewRef={scrollViewRef}
            styles={styles}
            messages={messages}
            setInputBarText={setInputBarText}
            inputBarText={inputBarText}
          />
        ) : (
          <WelcomeView
            scrollToBottom={scrollToBottom}
            sendMessage={sendMessage}
            submitText={submitText}
            scrollViewRef={scrollViewRef}
            styles={styles}
            setInputBarText={setInputBarText}
            inputBarText={inputBarText}
          />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#fff8f2',
  },
  messages: {
    flex: 1,
  },
});
