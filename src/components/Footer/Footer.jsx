import React from 'react'
import styles from './Footer.module.css'
import FooterNav from './FooterNav/FooterNav'
import FooterBasement from './FooterBasement/FooterBasement'
import { ReactComponent as Logo } from '../../assets/Images/logo.svg'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.up_footer}>
        <div className="container">
          <div className={styles.up_footer_content}>
            <NavLink to="/">
              <Logo />
            </NavLink>
            <FooterNav />
          </div>
        </div>
      </div>
      <div className={styles.footer_basement}>
        <div className="container">
          <FooterBasement />
        </div>
      </div>
    </footer>
  )
}

export default Footer
