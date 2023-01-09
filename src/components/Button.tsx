import React, {type PropsWithChildren} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type ButtonProps = {
  onPress: () => void;
};

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});
