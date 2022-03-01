import React from "react";
import styles from "./HeaderLogo.module.css";
import logo from "../../../assets/Images/logo.png";

function HeaderLogo () {
  return(
      <div className={styles.logo}>
        <img src={logo} alt="logo"/>
      </div>
  )
}

export default HeaderLogo;