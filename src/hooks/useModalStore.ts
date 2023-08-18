import { create } from "zustand";

type ModalView = "image" | "profile";

interface ModalState {
   view: ModalView;
   isOpen: boolean;
}

interface ModalAction {
   onOpen: (view: ModalView) => void;
   onClose: () => void;
}

const useModalStore = create<ModalState & ModalAction>((set) => ({
   isOpen: false,
   view: "image",

   onOpen: (view: ModalView) =>
      set(() => ({
         isOpen: true,
         view,
      })),
   onClose: () => set({ isOpen: false }),
}));

export default useModalStore;
