import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
    cart: [],
    shipping_fee: 5,
    total_price: 0
};

const cartReducer = (state, action) => {
    switch (action.type) {

        //Add TO Cart// 
        case "ADD_TO_CART":
            const { id, title, price, quantity, thumbnail, stock } = action.payload;
            const existingProduct = state.cart.find((curItem) => curItem.id === id);
            if (existingProduct) {
                const updatedCart = state.cart.map((curElem) => {
                    if (curElem.id === id) {
                        // Ensure the quantity does not exceed the available stock
                        const newQuantity = Math.min(curElem.quantity + quantity, curElem.stock);
                        return {
                            ...curElem,
                            quantity: newQuantity,
                        };
                    }
                    return curElem;
                });

                return {
                    ...state,
                    cart: updatedCart,
                };
            } else {
                const cartProduct = {
                    id,
                    title,
                    price,
                    quantity: Math.min(quantity, stock), // Ensure initial quantity does not exceed stock
                    thumbnail,
                    stock, // Store the stock in the cart product
                };

                return {
                    ...state,
                    cart: [...state.cart, cartProduct],
                };
            }

        //Increment//
        case "INCREMENT": {
            let updatedProduct = state.cart.map((curElem) => {
                if (curElem.id === action.payload) {
                    // Ensure the quantity doesn't exceed the available stock
                    let newAmount = curElem.quantity + 1;
                    if (newAmount > curElem.stock) {
                        newAmount = curElem.stock; // Cap the quantity at the available stock
                    }
                    return {
                        ...curElem,
                        quantity: newAmount,
                    };
                } else {
                    return curElem;
                }
            });
            return {
                ...state,
                cart: updatedProduct,
            };
        }

        //Decrement//
        case "DECREMENT": {
            let updatedProduct = state.cart.map((curElem) => {
                if (curElem.id === action.payload) {
                    let decAmount = curElem.quantity - 1;
                    if (decAmount <= 1) {
                        decAmount = 1;
                    }
                    return {
                        ...curElem,
                        quantity: decAmount,
                    };
                } else {
                    return curElem;
                }
            });
            return {
                ...state,
                cart: updatedProduct
            };
        }

        //Cart Total//
        case "CART_TOTAL_PRICE": {
            let total_price = state.cart.reduce((initialval, curElem) => {
                return initialval + curElem.price * curElem.quantity;
            }, 0);
            return {
                ...state,
                total_price
            };
        }

        //Remove Item//
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload.id),
            };

        //Clear Items//
        case "CLEAR_CART":
            return {
                ...state,
                cart: []
            };

        ////
        case "LOAD_INITIAL_STATE":
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load state from localStorage on the client side
    useEffect(() => {
        const savedState = localStorage.getItem("cartState");
        if (savedState) {
            dispatch({ type: "LOAD_INITIAL_STATE", payload: JSON.parse(savedState) });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartState", JSON.stringify(state));
    }, [state]);

    useEffect(() => {
        dispatch({ type: "CART_TOTAL_PRICE" });
    }, [state.cart]);
    //Providers//
    return (
        <CartContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(CartContext);
};
export { useGlobalContext };