import {create} from 'zustand';

type ProductCategoryState = {
  product_category: string | null;
  setProductCategory: (category: string) => void;
};

export const useProductCategory = create<ProductCategoryState>((set) => ({
  product_category: null,
  setProductCategory: (category: string) => set({ product_category: category }),
}));
