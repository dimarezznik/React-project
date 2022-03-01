import React, { useEffect, useState } from 'react'

function SignIn({ setSignIn, setSignUp, setIsAuth, users }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [emailError, setEmailError] = useState('email не может быть пустым')
  const [passwordError, setPasswordError] = useState(
    'Пароль не может быть пустым'
  )
  const [validForm, setValidForm] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users'))
    users.forEach((user) => {
      if (user.email !== email) {
        setEmailDirty(true)
        setEmailError('Введен неверный email')
      } else if (user.password !== password) {
        setPasswordDirty(true)
        setPasswordError('Введен неверный пароль')
      } else {
        localStorage.setItem('token', email)
        setIsAuth(true)
      }
      if (user.email === email && user.password === password) {
        setSignIn(false)
      }
    })
  }

  useEffect(() => {
    if (emailError || passwordError) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [emailError, passwordError])

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^\S+@\S+\.\S+$/
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Email некорректен')
      if (!e.target.value) {
        setEmailError('email не может быть пустым')
      }
    } else {
      setEmailError('')
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 5 || e.target.value.length > 14) {
      setPasswordError('пароль должен быть не меньше 5 и не больше 14 символов')
      if (!e.target.value) {
        setPasswordError('Пароль не может быть пустым')
      }
    } else {
      setPasswordError('')
    }
  }

  const blurHandle = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
    }
  }

  function signUpTo() {
    setSignIn(false)
    setSignUp(true)
  }

  return (
    <>
      <h2>Log in to your account</h2>
      <form onSubmit={onSubmit}>
        <label className="email" htmlFor="email">
          Email
          {emailDirty && emailError && (
            <div style={{ color: 'red' }}>{emailError}</div>
          )}
          <input
            onChange={emailHandler}
            value={email}
            onBlur={blurHandle}
            name="email"
            type="email"
            id="email"
            placeholder="Your email"
          />
        </label>
        <label className="password" htmlFor="password">
          Password
          {passwordDirty && passwordError && (
            <div style={{ color: 'red' }}>{passwordError}</div>
          )}
          <input
            onChange={passwordHandler}
            value={password}
            onBlur={blurHandle}
            name="password"
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </label>
        <div className="btn-div">
          <button disabled={!validForm} className="btn-register">
            Register
          </button>
        </div>
        <div className="create-acc">
          <span>No account?</span> <a onClick={signUpTo}>Create on</a>
        </div>
      </form>
    </>
  )
}

export default SignIn
