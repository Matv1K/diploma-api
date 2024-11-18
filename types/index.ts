// Types related to instruments

export interface InstrumentCardI {
    _id: string;
    name: string;
    section: string;
    price: number;
    instrumentType: string;
    isNew: boolean;
    image: string;
    brandName: string;
    colors: string[];
    instrumentId: string;
    onSale: boolean;
    salePrice: number;
  }
  
  export interface InstrumentI {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    isNew?: boolean;
    section: string;
    brandName: string;
    salePrice?: number;
    onSale?: boolean;
    bought?: number;
    colors: string[];
    characteristics?: Record<string, string>;
    instrumentType: string;
  }
  
  // Types related to users
  
  export interface UserDataI {
    address: {
      country: string;
      city: string;
      address: string;
    };
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
  }
  
  export interface UpdatedUserDataI {
    name: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: {
      country: string,
      city: string,
      address: string
    }
  }
  
  // Types related to auth
  
  export interface SignUpDataI {
    name: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  export interface SignInDataI {
    email: string;
    password: string;
  }
  
  export interface ResetPasswordI {
    currentPassword: string,
    newPassword: string,
    confirmedPassword: string,
  }
  
  // Types related to orders
  
  export interface OrderItemI {
    _id?: string;
    cartItemId?: string,
    name: string;
    price: number;
    color: string;
    amount: number;
    instrumentId: string;
  }
  
  export interface OrderI {
    _id: string;
    userId: string;
    items: OrderItemI[];
    status: string;
    totalPrice: number;
  }
  
  // Types related to comments
  
  export interface CommentI {
    _id: string,
    createdAt: string,
    description: string,
    userName: string,
    rating: number
  }
  
  // Types related to cart items
  
  export interface CartItemI {
    color: string;
    image: string;
    price: number;
    name: string;
    amount: number;
    instrumentId: string;
    section: string;
    brandName: string;
    instrumentType: string,
  }
  
  export interface CartItemWithDatabaseIdI extends CartItemI {
    _id: string;
  }
  
  export interface CartItemWithLocalIdI extends CartItemI {
    cartItemId: string;
  }
  
  export type CartItemUnionI = CartItemWithDatabaseIdI | CartItemWithLocalIdI;
  
  // Types related to liked items
  
  export interface LikedItemI {
    _id?: string;
    name: string;
    image: string;
    brandName: string;
    colors: string[];
    userId?: string;
    instrumentId: string;
    section: string;
    instrumentType: string;
    amount?: number;
    price: number;
  }
  
  // Types related to errors
  
  export interface ApiError {
    message: string;
    response: {
      status: number;
      data: {
        message: string;
      };
    };
  }
  
  // Enum types
  
  export enum ButtonOptions {
    _OUTILINE = 'outline',
    _FILLED = 'filled',
    _GOOGLE = 'google',
  }
  
  export enum ButtonTypes {
    _SUBMIT = 'submit',
    _RESET = 'reset',
    _BUTTON = 'button',
  }
  
export enum InputTypes {
    _TEXT = 'text',
    _EMAIL = 'email',
    _PASSWORD = 'password',
    _SEARCH = 'search',
  }
  