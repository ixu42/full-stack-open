import { useContext } from 'react'
import UserContext from '../contexts/UserContext'

export const useUserValue = () => {
  const context = useContext(UserContext)
  return context.user
}

export const useUserDispatch = () => {
  const context = useContext(UserContext)
  return context.dispatch
}
