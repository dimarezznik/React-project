import React from 'react'
import styles from './Main.module.css'
import MainTitle from './MainTitle/MainTitle'
import MainItems from './MainItems/MainItems'

function Main({ cards }) {
  return (
    <main className={styles.main}>
      <div className="container">
        <MainTitle />
        <div className={styles.columns}>
          {cards.map((item) => {
            return (
              <MainItems
                image={item.image}
                key={item.id}
                name={item.name}
                id={item.id}
                price={item.price}
              />
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default Main
