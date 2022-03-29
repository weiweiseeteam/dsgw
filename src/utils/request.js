import axios from 'axios'

const request = axios.create({
  baseURL: 'https://www.fastmock.site/mock/7fd27249f22e59b89ef056decfd2d7c0/jd',
  timeout: 100000
})

export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    request.post(url, data).then((response) => { resolve(response.data.data) }, error => {
      reject(error)
    })
  })
}

export const get = (url, data) => {
  return new Promise((resolve, reject) => {
    request.get(url, data, {
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => { resolve(response) }, error => {
      reject(error)
    })
  })
}

export const patch = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    request.patch(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}
