import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

const CartContext = React.createContext([[]])

export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
	const [basketItems, setBasketItems] = useState([])
	const [total, setTotal] = useState(0)
	const [countProducts, setCountProducts] = useState(0)
	const [allGames, setAllGames] = useState([])
	const [checkingCheckout, setCheckingCheckout] = useState(false)

	useEffect(() => {
		getGames()
	}, [])

	const getGames = () => {
		axios
			.get(`${import.meta.env.VITE_BACKEND_URL}/games`, {
				withCredentials: true
			})
			.then(response => {
				setAllGames(response.data)
			})
			.catch(error => {
				console.log('An error ocurred', error)
			})
	}

	const handleProduct = (game, operator = 'add') => {
		if (operator === 'remove' && game.qty > 1) {
			const games = basketItems.map(item =>
				item.id === game.id ? { ...item, qty: item.qty - 1 } : item
			)
			setTotal(total - game.price)
			setCountProducts(countProducts - 1)
			setBasketItems([...games])
		} else if (operator === 'remove' && game.qty === 1) {
			deleteGame(game)
		} else if (operator === 'add') {
			if (basketItems.find(item => item.id === game.id)) {
				const games = basketItems.map(item =>
					item.id === game.id ? { ...item, qty: item.qty + 1 } : item
				)
				setTotal(total + game.price * game.qty)
				setCountProducts(countProducts + 1)
				setBasketItems([...games])
			} else {
				setTotal(total + game.price * game.qty)
				setCountProducts(countProducts + 1)
				setBasketItems([...basketItems, game])
			}
		}
	}

	const deleteGame = game => {
		const result = basketItems.filter(item => item.id !== game.id)
		setTotal(total - game.price * game.qty)
		setCountProducts(countProducts - game.qty)
		setBasketItems(result)
	}

	const cleaningBasket = () => {
		setTotal(0)
		setCountProducts(0)
		setBasketItems([])
	}

	return (
		<CartContext.Provider
			value={{
				basketItems,
				total,
				countProducts,
				handleProduct,
				deleteGame,
				allGames,
				cleaningBasket,
				checkingCheckout,
				setCheckingCheckout,
				getGames
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
