import React from 'react'
import styles from './MainItems.module.css'
import Item from './Item/Item'

function MainItems({ name, id, price, image }) {
  return (
    <div className={styles.col_items}>
      <Item name={name} id={id} price={price} image={image} />
    </div>
  )
}

export default MainItems
