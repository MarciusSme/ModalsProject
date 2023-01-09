import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ModalProps} from './ModalProvider';

type BottomSheetModalProps = ModalProps & {
  data: string;
};

export const NextModal: React.FC<BottomSheetModalProps> = ({
  closeModal,
  data,
}) => {
  const onPress = () => {
    closeModal();
    console.log('Next modal closed');
  };
  console.log('Next modal rendered');

  return (
    <Pressable style={styles.modal} onPress={onPress}>
      <View style={styles.modalContent}>
        <ModalContent data={data} />
      </View>
    </Pressable>
  );
};

const ModalContent = ({data}: {data: string}) => {
  return (
    <View>
      <Text>Next Modal Content</Text>
      <Text>{data}</Text>
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
});
