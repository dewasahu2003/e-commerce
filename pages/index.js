import React from 'react'
import { Product, Footer, Footerbanner, layout, HeroBanner } from '../components'
import { client } from '../lib/client'

const index = ({ product_data, banner_data }) => {
  return (
    <>
      <HeroBanner heroBanner={banner_data[0]} />

      <div className="products-heading">
        <h2>HeadPhone</h2>
        <p>headphone ♨️</p>
      </div>

      <div className='product-container'>
        {product_data?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <Footerbanner footerbanner={banner_data && banner_data[0]} />

    </>

  )
}
//getServerSideProps -- for server side rendering
export const getServerSideProps = async () => {
  const product_query = '*[_type=="product"]'
  const product_data = await client.fetch(product_query)

  const banner_query = '*[_type=="banner"]'
  const banner_data = await client.fetch(banner_query)

  return {
    props: { product_data, banner_data }
  }
}

export default index