import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './ProductPage.module.css'
import { ReactComponent as IceCream2 } from '../../assets/Images/icecream2.svg'
import { ReactComponent as Plus } from '../../assets/Images/plus.svg'
import { ReactComponent as Minus } from '../../assets/Images/minus.svg'
import { ReactComponent as CartIcon } from '../../assets/Images/cart_white.svg'
import { ReactComponent as Done } from '../../assets/Images/done.svg'

function ProductPage({
  card,
  arr,
  setArr,
}) {
  const [amount, setAmount] = useState(1)
  const [message, setMessage] = useState('')
  const [countPrice, setCountPrice] = useState(card.price)
  const [total, setTotal] = useState(0)
  const [obj, setObj] = useState({})
  const token = localStorage.getItem('token')

  let indexUser, indexProduct

  const addCard = (id) => {
    const users = JSON.parse(localStorage.getItem('users'))

    const user = users.find((user, index) => {
      if (user.email === token) {
        indexUser = index
        return user
      }
    })

    const product = user.cart.find((product, index) => {
      if (product.id === id) {
        indexProduct = index
        return product
      }
    })
    product
      ? (user.cart[indexProduct] = {
          ...product,
          amount: product.amount + amount,
        })
      : user.cart.push({
          ...card,
          amount: amount,
        })

    users[indexUser] = user

    localStorage.setItem('users', JSON.stringify(users))

    if (!!arr.find((el) => el.id === id)) {
      setArr(
        arr.map((elem) => {
          if (elem.id === id) {
            return {
              ...elem,
              amount: elem.amount + amount,
              countPrice: elem.countPrice,
              total: elem.total,
            }
          }
          return elem
        })
      )
    } else {
      setArr([...arr, { ...card, amount, countPrice, total }])
      setMessage('Added to cart')
    }
  }

  const handleMinus = () => {
    if (amount === 1) {
      setAmount(1)
    } else {
      setAmount(amount - 1)
      setCountPrice(countPrice - card.price)
    }
  }

  const handlePlus = () => {
    setAmount(amount + 1)
    setCountPrice(countPrice + card.price)
  }

  return (
    <div className={styles.content_product}>
      <div className="container">
        <div>
          <NavLink to="/" className={styles.href_main}>
            Main Page
          </NavLink>
          <span className={styles.sspan}> / Product Page</span>
        </div>
        <div className={styles.row_product}>
          <div className={styles.row_img_key}>
            <div className={styles.img_product}>
              <img src={card.image} alt="" />
            </div>
            <div className={styles.img_key}>
              <div className={styles.name_desk}>
                <div className={styles.key}>
                  <span>SKU: {card.id}</span>
                </div>
              </div>
              <h1>Snow Tender Ice Cream</h1>
              <p className={styles.description}>Description:</p>
              <p>{card.descriptionOne}</p>
              <p>{card.descriptionTwo}</p>
              <div className={styles.price_count}>
                <span>${countPrice}</span>
                <div className={styles.count}>
                  <div>
                    <Minus onClick={() => handleMinus()} />
                  </div>{' '}
                  <span>{amount}</span>
                  <div>
                    <Plus onClick={() => handlePlus()} />
                  </div>
                </div>
              </div>
              <div className={styles.button}>
                {localStorage.getItem('token') ? (
                  <button
                    className={styles.btn}
                    onClick={() => addCard(card.id)}
                  >
                    <CartIcon />
                    Add to cart
                  </button>
                ) : (
                  <button disabled={true} className={styles.btn_disable}>
                    <CartIcon />
                  </button>
                )}

                {message && (
                  <div className={styles.active}>
                    <Done />
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
