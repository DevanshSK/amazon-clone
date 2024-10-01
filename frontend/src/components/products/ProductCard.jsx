import React from 'react'
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { _id, name, seller, brand, description, price, category, mainImage } = product;

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
    }).format(price)

    console.table(mainImage?.url);

    return (
        <div className='border p-4 rounded bg-white max-w-96'>
            <Link to={`/product/${_id}`}>
                <img 
                    src={mainImage?.url} 
                    alt={name} 
                    className='w-full object-cover aspect-square mb-2'
                />
                <h2 className='font-bold'>{name}</h2>
                <p>{formattedPrice}</p>
            </Link>
        </div>
    )
}

export default ProductCard