import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import {addToDb} from '../../utilities/fakedb.js';
import {getStoredCart} from '../../utilities/fakedb.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    // Product to be render Ui
    const [displayProducts, setDisplayProducts] = useState([]);

    useEffect( () => {
        // console.log('API Called');
        fetch('./products.JSON')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setDisplayProducts(data);
            // console.log('product received');
        })
    },[])

    useEffect( () => {
        // console.log('localStorage cart call')

        // const savedCart = getStoredCart();
        //     for(const key in savedCart) {
        //         const addedProduct = products.find(product => product.key === key);
        //         console.log(key, addedProduct)
        // }

        // if(products.length){
        //     const savedCart = getStoredCart();
        //     const storedCart = [];
        //     for(const key in savedCart) {
        //         const addedProduct = products.find(product => product.key === key);
        //         storedCart.push(addedProduct);
        //     }
        //     setCart(storedCart);
        // }

        if(products.length){
            const savedCart = getStoredCart();
            const storedCart = [];
            for(const key in savedCart) {
                // console.log(storedCart[key]);
                const addedProduct = products.find(product => product.key === key);
                if(addedProduct){
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                }
            }
            setCart(storedCart);
        }
    }, [products])

    const handleAddToCart = (product) => {
        // console.log(product);
        const newCart = [...cart, product]
        setCart(newCart);

        // Add to LocalStorage
        addToDb(product.key);
    }

    const handleSearch = event => {
        // console.log(event.target.value);
        const searchText = event.target.value;
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchedProducts);
        // console.log(matchedProducts.length);
    }
    return (
        <div>
            <div className="search-container">
                <input type="text" onChange={handleSearch} placeholder="Type here to search........." />
                <p><FontAwesomeIcon icon={faShoppingCart} /> <span>{cart.length}</span></p>
            </div>
            <div className="shop-container">
                <div className="product-container">
                    {/* <h1>Product: {products.length}</h1> */}
                    {
                        // products.map(product => <Product product={product} key={product.key} handleAddToCart={handleAddToCart}></Product>)
                        displayProducts.map(product => <Product product={product} key={product.key} handleAddToCart={handleAddToCart}></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;