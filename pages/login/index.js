import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {setLoginWithEmailAndPassword} from "../../firebase/auth";
import {getUsers} from "../../firebase/data/users";

const emailId = 'slot-email'
const passwordId = 'slot-password'

const Login = () => {
  const router = useRouter()

  const [usersList, setUsersList] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    getUsers()
      .then(data => {
        console.log('USERS', data)
        setSelectedUser(data[0])
        setUsersList(data)
      })
      .catch(err => console.log('ERROR_ON_GET_USERS', err))
  }, [])

  const onSubmitLogin = (e) => {
    e.preventDefault()
    setLoginWithEmailAndPassword(selectedUser.email, document.getElementById(passwordId).value)
      .then(data => data && router.push('/home'))
      .catch(err =>  console.log('ERR:', err))
  }

  return (
    <form onSubmit={e => onSubmitLogin(e)}>
      <select
        id={'emailId'}
        name={'user'}
        onChange={e => setSelectedUser(JSON.parse(e.target.value))}
      >
        {usersList.map((item, key) => {
          return (
            <option
              key={key}
              value={JSON.stringify(item)}
            >
              {item.name}
            </option>
          )
        })}
      </select>
      <input id={passwordId} type='password' name='user password' required />
      <input type="submit" value="Enviar datos" />
    </form>
  )
}

export default Login
