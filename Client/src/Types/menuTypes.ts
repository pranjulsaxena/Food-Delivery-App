export type Menu = {
  Name: string;
  Description: string;
  Price: number;
  MenuImage: undefined;
};

export type menuStoreType = {
  loading: boolean;
  menu: Menu[];
  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (menuId: string, formData: FormData) => Promise<void>;
};
