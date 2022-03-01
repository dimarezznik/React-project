import React from 'react'
import styles from './HeaderSignCart.module.css'
import { ReactComponent as User } from '../../../assets/Images/user.svg'
import { ReactComponent as Cart } from '../../../assets/Images/cart_grad.svg'
import { ReactComponent as Ellipse } from '../../../assets/Images/ellipse.svg'
import { NavLink } from 'react-router-dom'

function HeaderSignCart({ setSignIn, setSignUp, arr, signIn, isAuth, logout }) {
  return (
    <div className={styles.sign_cart}>
      <div className={styles.user}>
        <User />
      </div>
      {localStorage.getItem('token') ? (
        <>
          <span onClick={logout}>logout</span>
          <div className={styles.all_cart}>
            <NavLink to="/cart">
              <div className={styles.images_cart}>
                <div className={styles.images}>
                  <div className={styles.cart}>
                    <Cart />
                  </div>
                  {!!arr.length && (
                    <div className={styles.ellipse}>
                      <Ellipse /> <span>{arr.length}</span>
                    </div>
                  )}
                </div>
                <p>Cart</p>
              </div>
            </NavLink>
          </div>
        </>
      ) : (
        <>
          <span onClick={() => setSignUp(true)}> Sign Up </span> <span>/</span>{' '}
          <span onClick={() => setSignIn(true)}>Sign In</span>
        </>
      )}
    </div>
  )
}

export default HeaderSignCart
