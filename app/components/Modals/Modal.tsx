'use client';

import React from 'react';
import styled from 'styled-components';
import { useGlobalState } from '@/app/context/globalContextProvider';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: Props) {
  const { theme } = useGlobalState();

  if (!isOpen) return null;

  return (
    <ModalOverlay theme={theme} onClick={onClose}>
      <ModalContent theme={theme} onClick={(e) => e.stopPropagation()}>
        <CloseButton theme={theme} onClick={onClose}>
          ×
        </CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: ${(props) => props.theme.shadow7};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.colorGrey2};
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colorGrey5};
    color: ${(props) => props.theme.colorGrey0};
  }
`;

export default Modal;
