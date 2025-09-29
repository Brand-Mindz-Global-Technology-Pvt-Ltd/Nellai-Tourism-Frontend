import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EnquireModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const EnquireModalContext = createContext<EnquireModalContextType | undefined>(undefined);

export function EnquireModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <EnquireModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </EnquireModalContext.Provider>
  );
}

export function useEnquireModal() {
  const context = useContext(EnquireModalContext);
  if (context === undefined) {
    throw new Error('useEnquireModal must be used within an EnquireModalProvider');
  }
  return context;
}
