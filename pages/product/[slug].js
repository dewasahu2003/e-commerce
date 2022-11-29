import React, { useState } from 'react'
import { urlFor, client } from '../../lib/client'
import { AiOutlineStar, AiFillStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'

const ProductDetail = ({ product_data, product_data_all }) => {
    const { image, name, details, price } = product_data

    const [index, setIndex] = useState(0)
    const { decQty, inQty, qty, onAdd, setShowCart } = useStateContext()
    const handleBuynow = () => {
        onAdd(product_data, qty)
        setShowCart(true)
    }

    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img src={urlFor(image && image[index])} className='product-detail-image' />

                    </div>
                    <div className='small-images-container'>
                        {image?.map((item, i) => (<img key={i} src={urlFor(item)} className={i === index ? 'small-image selected-image' : 'small-image'} onMouseEnter={() => setIndex(i)} />))}

                    </div>
                </div>

                <div className='product-detail-desc'>
                    <h1>{name}</h1>

                    <div className='reviews'>
                        <div className='icons'>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>

                    </div>
                    <div>
                        <h4>Details: </h4>
                        <p>{details}</p>
                    </div>
                    <p className='price'>${price}</p>
                    <div className='quantity'>
                        <h1>Quantity: </h1>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={decQty}>
                                <AiOutlineMinus />
                            </span>
                            <span className='num' >
                                {qty}
                            </span>
                            <span className='plus' onClick={inQty}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className='buttons'>
                        <button type='button' className='add-to-cart' onClick={() => onAdd(product_data, qty)}>Add to Cart</button>
                        <button type='button' className='buy-now' onClick={handleBuynow}>Buy Now</button>

                    </div>
                </div>

            </div>
            <div className='maylike-products-wrapper'>
                <h2>May Also Like</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {product_data_all.map((product) => <Product
                            key={product._id} product={product}></Product>)}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail


export const getStaticPaths = async () => {
    const query = `*[_type=="product"]{
        slug{
            current
        }

    }`
    const products = await client.fetch(query)
    const paths = products.map(product => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

//getStaticProps
export const getStaticProps = async ({ params: { slug } }) => {
    const product_query = `*[_type=="product" && slug.current ==  '${slug}'][0]`;
    const product_query_all = `*[_type=="product"]`
    const product_data = await client.fetch(product_query)
    const product_data_all = await client.fetch(product_query_all)


    return {
        props: {
            product_data, product_data_all
        }
    }

}