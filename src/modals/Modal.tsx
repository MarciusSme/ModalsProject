import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {ModalProps} from './ModalProvider';

type BottomSheetModalProps = ModalProps & {};

export const Modal: React.FC<BottomSheetModalProps> = ({closeModal}) => {
  const [inputValue, setInputValue] = useState('');

  const onPress = () => {
    closeModal({
      action: 'CLOSE',
      value: inputValue,
    });
    console.log('Modal closed');
  };
  console.log('Modal rendered');

  return (
    <Pressable style={styles.modal} onPress={onPress}>
      <View style={styles.modalContent}>
        <ModalContent inputValue={inputValue} setInputValue={setInputValue} />
      </View>
    </Pressable>
  );
};

const ModalContent = ({
  inputValue,
  setInputValue,
}: {
  inputValue: string;
  setInputValue: (value: string) => void;
}) => {
  return (
    <View>
      <Text>Modal Content</Text>
      <TextInput
        style={styles.textInput}
        value={inputValue}
        onChangeText={setInputValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 300,
    width: 300,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
  },
});
