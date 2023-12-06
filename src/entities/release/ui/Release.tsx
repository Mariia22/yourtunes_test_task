import React from 'react'
import { Link } from 'react-router-dom'

export const Release: React.FC<{ link: string, id: string }> = ({ link, id }) => {
  return (
    <Link to={`/release/${id}`}>
      <img src={link} width="300px" height="300px" />
    </Link>
  )
}
