import React from 'react'
import { useGetAllReleasesQuery } from '../../entities/release/api/releaseApi'
import { Release } from '../../entities/release/ui/Release'

export const ReleasesPage: React.FC = () => {
  const { data, isLoading, error, isError } = useGetAllReleasesQuery()
  console.log(data, isLoading, error)

  if (isError) {
    return <div>Oh no, there was an error</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (data === undefined || data.length === 0) {
    return null
  }

  return (
    <div>
      {data.map((release) => (
        <Release key={release.uid} />
      ))}
    </div>
  )
}
