import { create } from 'zustand';

type AdminMessageModal = {
  modalOpen?: boolean;
  status?: string;
  message?: string;
  setModalState: (modalOpen?: boolean, status?: string, message?: string) => void;
};

export const useMessageModal = create<AdminMessageModal>((set) => ({
  modalOpen: false,
  status: undefined,
  message: undefined,
  setModalState: (modalOpen, status,  message) => set({ modalOpen, status, message }),
}));
