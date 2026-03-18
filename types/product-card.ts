export interface Props {
  name: string;
  price: string | number;
  imagesrc: string;
  product: {name: string; price: number; image: string; subcategory: string; category:string, _id: string};
  closeMessage: (modalOpen?: boolean, status?: string, message?: string) => void;
  setModalState: React.Dispatch<React.SetStateAction<{isOpen: boolean; productData: any, isNewProduct: boolean}>>;
}