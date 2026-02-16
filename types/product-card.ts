export interface Props {
  name: string;
  price: string | number;
  imagesrc: string;
  product: {name: string; price: number; image: string; subcategory: string; _id: string}
  setModalState: React.Dispatch<React.SetStateAction<{isOpen: boolean; productData: any, isNewProduct: boolean}>>;
}