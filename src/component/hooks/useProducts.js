import { useState } from 'react';
import { useEffect } from 'react';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect( () => {
        fetch('./products.JSON')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
    // return necessary things
    return [products, setProducts]
};

export default useProducts;