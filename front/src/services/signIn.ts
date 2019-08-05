import hello from 'hellojs'

import { User } from '../types'

const FACEBOOK_ID = process.env.REACT_APP_FACEBOOK_ID
const API_URL = process.env.REACT_APP_API_URI

hello.init({
  facebook: FACEBOOK_ID!
})

export async function signIn() {
  const { authResponse } = await hello.login('facebook')

  return new Promise<User | null>(async (resolve, reject) => {
    if (authResponse) {
      const user = await fetch(`${API_URL}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ facebook_token: authResponse.access_token })
      })
        .then(response => response.json())
        .then(response => response as User & { token: string })

      localStorage.setItem('token', user.token)
      resolve(user)
    }

    reject()
  })
}

export async function signOut() {
  localStorage.removeItem('token')
}

export async function checkSession() {
  const token = localStorage.getItem('token')

  return new Promise<User | null>(async (resolve, reject) => {
    if (token) {
      try {
        const user = await fetch(`${API_URL}/sessions`, {
          headers: { Authorization: token }
        })
          .then(response => response.json())
          .then(response => response as User)

        return resolve(user)
      } catch (e) {
        reject(null)
      }
    }

    resolve(null)
  })
}
