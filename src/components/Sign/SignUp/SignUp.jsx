import React, { useEffect, useState } from 'react'

function SignUp({
  setSignIn,
  setSignUp,
  setIsAuth,
  users,
  setUsers,
  cart,
  setCart,
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameDirty, setNameDirty] = useState(false)
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [nameError, setNameError] = useState('Имя не может быть пустым')
  const [emailError, setEmailError] = useState('email не может быть пустым')
  const [passwordError, setPasswordError] = useState(
    'Пароль не может быть пустым'
  )
  const [validForm, setValidForm] = useState(false)

  const onSubmit = (e) => {
    const validEmail = users.find((user) => {
      if (user.email === email) {
        return email
      }
    })
    const obj = {
      name,
      email,
      password,
      cart,
    }
    e.preventDefault()
    const regexName = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/
    const re = /^\S+@\S+\.\S+$/
    if (
      !regexName.test(String(name).toLowerCase()) ||
      !re.test(String(email).toLowerCase()) ||
      password.length < 5 ||
      password.length > 14
    ) {
      setNameDirty(true)
      setNameError('Введены неправильные данные')
    } else if (validEmail) {
      setEmailDirty(true)
      setEmailError('Пользователь с таким email уже существует')
    } else {
      e.preventDefault()
      setUsers([...users, obj])
      localStorage.setItem('token', email)
      setIsAuth(true)
      setSignUp(false)
    }
  }

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    if (nameError || emailError || passwordError) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [nameError, emailError, passwordError])

  const nameHandler = (e) => {
    setName(e.target.value)
    const regexName = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/
    if (!regexName.test(String(e.target.value).toLowerCase())) {
      setNameError('Имя некорректно')
      if (!e.target.value) {
        setNameError('Имя не может быть пустым')
      }
    } else {
      setNameError('')
    }
  }

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
      case 'name':
        setNameDirty(true)
        break
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
    }
  }

  function SignInTo() {
    setSignUp(false)
    setSignIn(true)
  }

  return (
    <>
      <h2>Create an account</h2>
      <form onSubmit={onSubmit}>
        <label className="name" htmlFor="name">
          Name
          {nameDirty && nameError && (
            <div style={{ color: 'red' }}>{nameError}</div>
          )}
          <input
            onChange={nameHandler}
            value={name}
            onBlur={blurHandle}
            type="name"
            id="name"
            name="name"
            placeholder="Your name"
          />
        </label>

        <label className="email" htmlFor="email-up">
          Email
          {emailDirty && emailError && (
            <div style={{ color: 'red' }}>{emailError}</div>
          )}
          <input
            onChange={emailHandler}
            value={email}
            onBlur={blurHandle}
            type="email"
            id="email-up"
            name="email"
            placeholder="Your email"
          />
        </label>

        <label className="password" name="password" htmlFor="passwordUp">
          Password
          {passwordDirty && passwordError && (
            <div style={{ color: 'red' }}>{passwordError}</div>
          )}
          <input
            onChange={passwordHandler}
            value={password}
            onBlur={blurHandle}
            type="password"
            id="passwordUp"
            name="password"
            placeholder="Enter your password"
          />
        </label>
        <div className="btn-div">
          <button disabled={!validForm} type="submit" className="btn-register">
            Register
          </button>
        </div>
        <div className="create-acc">
          <p>Do you already have an account?</p>{' '}
          <a onClick={() => SignInTo()}>Sing in</a>
        </div>
      </form>
    </>
  )
}

export default SignUp
