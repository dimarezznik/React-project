import React from "react";
import styles from "./FooterNav.module.css"

function FooterNav(){
  return(
      <nav>
        <ul className={styles.nav_ul}>
          <li><a href="#">Our Products</a></li>
          <li><a href="#">Privacy Terms</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Email</a></li>
        </ul>
      </nav>
  )
}

export default FooterNav;