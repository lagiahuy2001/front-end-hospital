const ID_TOKEN_KEY = 'token'
const ID_TOKEN_EXPIRE = 'expire_time'
const REFRESH_MILLISECOND = 300 * 1000

/**
 * @description get token form localStorage
 */
export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY)
}
/**
 * @description get exprire time token form localStorage
 */
export const getExpire = () => {
  return window.localStorage.getItem(ID_TOKEN_EXPIRE)
}

/**
 * @description save token into localStorage
 * @param token: string
 * @param expire_time: string
 */
export const saveToken = (token, expire_time) => {
  window.localStorage.setItem(ID_TOKEN_KEY, token)
  window.localStorage.setItem(ID_TOKEN_EXPIRE, expire_time)
}

/**
 * @description remove token form localStorage
 */
export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY)
  window.localStorage.removeItem(ID_TOKEN_EXPIRE)
}

export const isNeedRefresh = () => {
  const expireTime = getExpire() ?? 0
  const refreshTime = +expireTime - REFRESH_MILLISECOND
  return refreshTime < Date.now()
}

export const getTimeRefresh = () => {
  const expireTime = getExpire() ?? 0
  const refreshTime = +expireTime * 1000 - REFRESH_MILLISECOND

  return refreshTime - Date.now()
}

export const setValue = (key, value) => {
  window.localStorage.setItem(key, value)
}

export const getValue = (key) => {
  return window.localStorage.getItem(key)
}

export default {
  getToken,
  getExpire,
  getTimeRefresh,
  saveToken,
  destroyToken,
  isNeedRefresh,
  getValue,
  setValue,
}
