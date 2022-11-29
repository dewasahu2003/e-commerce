import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'


import { useStateContext } from '../context/StateContext'
import { firework } from '../lib/utils'

const success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext()

    useEffect(() => {
        localStorage.clear()
        setCartItems([])
        setTotalPrice(0)
        setTotalQuantity(0)
        firework()

    })

    return (

        <div className='success-wrapper'>
            <div className='success'>
                <p className='icon'>
                    <BsBagCheckFill />
                </p>
                <h2>ThankYou For Order</h2>
                <p className='email-msg'>check your email inbox</p>
                <p className='description'>
                    if you have question email
                    <a className='email' href='mailto:order@email.com'>
                        odin headphone
                    </a>
                </p>
                <Link href='/'>
                    <button type='button' width='300px' className='btn'>
                        continue shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default success