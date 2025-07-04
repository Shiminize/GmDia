export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customization?: {
    setting?: string;
    metal?: string;
    diamond?: string;
    engraving?: string;
  };
}

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCartSlider: () => void;
}; 