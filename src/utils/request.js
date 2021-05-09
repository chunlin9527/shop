import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/b8974f4c2cd08b6e31ec779af3d8b51e/jd',
  timeout: 10000,
  headers: {
    'content-type': 'application/json'
  }
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(response => {
      resolve(response)
    }, err => {
      reject(err)
    })
  })
}
