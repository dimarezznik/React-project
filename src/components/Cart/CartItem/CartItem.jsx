import React, { useState } from 'react'
import styles from './CartItem.module.css'
import { ReactComponent as IceCream2 } from '../../../assets/Images/icecream2.svg'
import { ReactComponent as Cross } from '../../../assets/Images/cross.svg'
import { NavLink } from 'react-router-dom'

function CartItem({ amount, name, price, id, removeItem, image }) {
  return (
    <div className={styles.row_close}>
      <div className={styles.img_name_basket}>
        <img src={image} alt="ice cream" />
        <div>
          <NavLink to={`/item/${id}`}>{name}</NavLink>
          <p>{amount} pcs.</p>
        </div>
      </div>

      <div className={styles.count_cross}>
        <span>${price * amount}</span>
        <Cross onClick={() => removeItem(id)} />
      </div>
    </div>
  )
}

export default CartItem
