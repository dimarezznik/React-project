import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import ProductPage from './components/ProductPage/ProductPage'
import Cart from './components/Cart/Cart'
import Sign from './components/Sign/Sign'
import SignIn from './components/Sign/SignIn/SignIn'
import SignUp from './components/Sign/SignUp/SignUp'
import { useCallback, useEffect, useState } from 'react'
import MockCards from './MockData/MainItem'

import { Routes, Route } from 'react-router-dom'

import './App.css'

function App() {
  const [cards, setCards] = useState(MockCards)
  const [signIn, setSignIn] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [cart, setCart] = useState([])
  const [users, setUsers] = useState(
    () => JSON.parse(localStorage.getItem('users')) ?? []
  )
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem(localStorage.getItem('token')))
  )
  const [arr, setArr] = useState(() => {
    const usersCart = JSON.parse(localStorage.getItem('users')) ?? []
    const token = localStorage.getItem('token')
    const user = usersCart.find((user) => {
      if (user.email === token) {
        return user.cart
      }
    })
    return user ? user.cart : []
  })

  useEffect(() => {
    if (isAuth) {
      const usersCart = JSON.parse(localStorage.getItem('users')) ?? []
      const token = localStorage.getItem('token')
      const cart = usersCart.find((user) => {
        if (user.email === token) {
          return user.cart
        }
      })
      setArr(cart.cart)
    }
  }, [isAuth])


  const removeItem = useCallback(
    (id) => {
      const usersCart = JSON.parse(localStorage.getItem('users'))
      const token = localStorage.getItem('token')
      let indexUser
      users.find((user, index) => {
        if (user.email === token) {
          indexUser = index
          return user
        }
      })

      const filterArr = arr.filter((x) => x.id !== id)

      usersCart[indexUser].cart = filterArr

      localStorage.setItem('users', JSON.stringify(usersCart))

      setArr(filterArr)
    },
    [arr]
  )


  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('token')
  }

  return (
    <div className="wrapper">
      <Header
        arr={arr}
        setArr={setArr}
        signIn={signIn}
        setSignIn={setSignIn}
        signUp={signUp}
        setSignUp={setSignUp}
        isAuth={isAuth}
        logout={logout}
      />
      <div className="content">
        <Routes>
          <Route path="/" element={<Main cards={cards} />} />
          {cards?.map((card, index) => (
            <Route
              key={card.id}
              path={`/item/${card.id}`}
              element={
                <ProductPage
                  card={card}
                  arr={arr}
                  setArr={setArr}
                />
              }
            />
          ))}
          <Route
            path="/cart"
            element={
              <Cart
                removeItem={removeItem}
                setCards={setCards}
                cards={cards}
                arr={arr}
                setArr={setArr}
              />
            }
          />
        </Routes>
        <Sign setIsOpen={setSignIn} active={signIn}>
          <SignIn
            users={users}
            setUsers={setUsers}
            setIsAuth={setIsAuth}
            setSignIn={setSignIn}
            setSignUp={setSignUp}
          />
        </Sign>
        <Sign setIsOpen={setSignUp} active={signUp}>
          <SignUp
            cart={cart}
            setCart={setCart}
            users={users}
            setUsers={setUsers}
            setIsAuth={setIsAuth}
            setSignIn={setSignIn}
            setSignUp={setSignUp}
          />
        </Sign>
      </div>
      <Footer />
    </div>
  )
}

export default App
