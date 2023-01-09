import React, {
  useCallback,
  useState,
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
} from 'react';

type PromiseResolvePayload = {
  action: 'CLOSE';
  value?: string;
};

export type ModalProps = {
  closeModal: (param?: PromiseResolvePayload) => void;
};

type ShowModalOptionsType<T> = {
  component: FunctionComponent<T>;
  props?: {[key: string]: unknown};
};

type ModalContextType = {
  showModal(
    options: ShowModalOptionsType<ModalProps>,
  ): Promise<PromiseResolvePayload>;
  closeModal(data?: PromiseResolvePayload): void;
};

export const ModalContext = createContext<ModalContextType>({
  showModal: () => Promise.reject(),
  closeModal: () => {},
});

type ModalStateType<T extends ModalProps> = {
  id: number;
  component: FunctionComponent<T>;
  props?: {[key: string]: unknown};
  resolve: (value: PromiseResolvePayload) => void;
};

export const ModalProvider = ({children}: {children: ReactNode}) => {
  const [state, setState] = useState<{
    modals: ModalStateType<ModalProps>[];
  }>({
    modals: [],
  });

  const showModal = useCallback(
    (
      options: ShowModalOptionsType<ModalProps>,
    ): Promise<PromiseResolvePayload> => {
      const {component, props} = options;
      return new Promise(resolve => {
        setState(prevState => ({
          ...prevState,
          modals: [
            ...prevState.modals,
            {
              id: prevState.modals.length,
              component,
              props,
              resolve,
            },
          ],
        }));
      });
    },
    [],
  );

  const closeModal = useCallback(
    (data: PromiseResolvePayload = {action: 'CLOSE'}) => {
      setState(prevState => {
        const modals = [...prevState.modals];
        const modal = modals.pop();

        if (modal) {
          modal.resolve(data);
        }

        return {
          ...prevState,
          modals,
        };
      });
    },
    [],
  );

  return (
    <ModalContext.Provider value={{showModal, closeModal}}>
      {children}
      {state.modals.map(modal => {
        const Modal = modal.component;
        return (
          <Modal key={modal.id} {...modal.props} closeModal={closeModal} />
        );
      })}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const {showModal, closeModal} = useContext(ModalContext);
  return {showModal, closeModal};
};
