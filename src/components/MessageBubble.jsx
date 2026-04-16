import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MessageBubble({ direction, text }) {
  const leftSpacer = direction === 'left' ? null : <View style={styles.spacer} />;
  const rightSpacer = direction === 'left' ? <View style={styles.spacer} /> : null;

  const bubbleStyles = direction === 'left'
    ? [styles.messageBubble, styles.messageBubbleLeft]
    : [styles.messageBubble, styles.messageBubbleRight];

  const bubbleTextStyle = direction === 'left'
    ? styles.messageBubbleTextLeft
    : styles.messageBubbleTextRight;

  return (
    <View style={styles.row}>
      {leftSpacer}
      <View style={bubbleStyles}>
        <Text style={bubbleTextStyle}>{text}</Text>
      </View>
      {rightSpacer}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 6,
  },
  spacer: {
    width: 60,
  },
  messageBubble: {
    borderRadius: 18,
    marginTop: 10,
    marginHorizontal: 8,
    paddingHorizontal: 14,
    paddingVertical: 11,
    flex: 1,
  },
  messageBubbleLeft: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#efd8c7',
  },
  messageBubbleTextLeft: {
    color: '#23160f',
    fontSize: 15,
    lineHeight: 21,
  },
  messageBubbleRight: {
    backgroundColor: '#da6b2c',
  },
  messageBubbleTextRight: {
    color: 'white',
    fontSize: 15,
    lineHeight: 21,
  },
});
