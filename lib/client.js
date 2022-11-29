import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: '9ke55h9o',
    dataset: 'production',
    apiVersion: '2022-11-24',
    useCdn: true,
    token: process.env.SANITY_TOKEN
})


const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

//to connect sanity client