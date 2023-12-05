import { getItemFromLocalStorage } from './localStorage'

export const queryHeaders = {
  Authorization: `Bearer ${getItemFromLocalStorage('token')}`
}
