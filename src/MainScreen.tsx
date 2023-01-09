import React, {type PropsWithChildren} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Button} from './components/Button';
import {Modal} from './modals/Modal';
import {useModal} from './modals/ModalProvider';
import {NextModal} from './modals/NextModal';

const Container: React.FC<PropsWithChildren> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

export const MainScreen = () => {
  const {showModal} = useModal();

  const buttonPress = async () => {
    const result = await showModal({
      component: Modal,
    });
    console.log('Modal result', result);
    if (result.action === 'CLOSE') {
      openNextModal(result.value);
    }
  };

  const openNextModal = async (prevResult: any) => {
    const result = await showModal({
      component: props => <NextModal {...props} data={prevResult} />,
    });
    console.log('Next modal result', result);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Container>
        <Text style={styles.text}>Welcome to Modals</Text>
        <Button onPress={buttonPress}>Click me!</Button>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  safeArea: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
