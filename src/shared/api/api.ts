import { getItemFromLocalStorage } from '../lib/localStorage'

export const queryHeaders = {
  Authorization: `Bearer ${getItemFromLocalStorage('token')}`
}
