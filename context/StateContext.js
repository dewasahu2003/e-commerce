import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
    // value,change_fun
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [qty, setQty] = useState(1)


    const inQty = () => {
        setQty((prevQty) => (prevQty + 1))
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1
            return prevQty - 1
        })
    }

    const onAdd = (product, quantity) => {
        const checkProductinCart = cartItems.find((item) => item._id === product._id)

        setTotalQuantity((prevTotalQty) => prevTotalQty + quantity)
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)

        if (checkProductinCart) {
            const updatedCartItem = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return {
                        ...cartProduct, quantity: cartProduct.quantity + quantity
                    }
                }
            })
            setCartItems(updatedCartItem)
        } else {
            product.quantity = quantity
            setCartItems([...cartItems, { ...product }])
        }
        toast.success(`${quantity} ${product.name} added to the cart`)

    }

    let foundProduct, index

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)


        //let oldcartmadenew = cartItems.splice(index, 1)  💀💀💀 mutatung the state should not be used
        let oldcartmadenew = cartItems.filter((item) => item._id !== id)

        if (value === 'inc') {

            let newCartItem = [...oldcartmadenew, { ...foundProduct, quantity: foundProduct.quantity + 1 }]
            // foundProduct.quantity += 1
            // cartItems[index] = foundProduct  //never to this in react 💀💀💀
            setCartItems(newCartItem)
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantity((prevQty) => prevQty + 1)

        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {

                let newCartItem = [...oldcartmadenew, { ...foundProduct, quantity: foundProduct.quantity - 1 }]
                setCartItems(newCartItem)
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantity((prevQty) => prevQty - 1)
            }

        }
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id)
        index = cartItems.findIndex((product) => product._id === product._id)
        let oldcartmadenew = cartItems.filter((item) => item._id !== product._id)
 
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity)
        setCartItems(oldcartmadenew)
    }

    return (<Context.Provider value={{
        showCart, setShowCart, cartItems, totalPrice, totalQuantity,setCartItems,setTotalPrice,setTotalQuantity,
        setTotalQuantity, qty, inQty, decQty, onAdd, toggleCartItemQuantity,onRemove
    }}>
        {children}
    </Context.Provider>
    )

}

export const useStateContext = () => useContext(Context)