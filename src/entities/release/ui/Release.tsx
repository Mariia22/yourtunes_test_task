import React from 'react'
import { type ReleaseType } from '../api/types'

export const Release: React.FC<Partial<ReleaseType>> = ({ avalink }) => {
  return <img src={avalink} width="30px" height="30px" />
}
