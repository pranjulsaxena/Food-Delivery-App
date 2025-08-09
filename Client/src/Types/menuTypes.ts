export type Menu = {
   name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  _id: string; 
  description?:string;
};

export type menuStoreType = {
  loading: boolean;
  menu: Menu[];
  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (menuId: string, formData: FormData) => Promise<void>;
};
