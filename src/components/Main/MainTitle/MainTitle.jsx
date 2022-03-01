import React from "react";
import styles from "./MainTitle.module.css";
import {ReactComponent as Heart} from "../../../assets/Images/heart.svg";


function MainTitle() {
  return(
      <div className={styles.title}><h1>i <Heart /> ice cream</h1></div>
  )
}

export default MainTitle;