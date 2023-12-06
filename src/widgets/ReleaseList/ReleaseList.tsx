import React from 'react'
import { useGetAllReleasesQuery } from '../../entities/release/api/releaseApi'
import { Grid } from '@mantine/core'
import { Release } from '../../entities/release/ui/Release'

export const ReleaseList: React.FC = () => {
  const { data, isLoading, isError } = useGetAllReleasesQuery()

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
    <Grid justify="space-around" align="center">
      {data.map(({ uid: id, ava_link: link }) => (
        <Grid.Col span={3} key={id}>
          <Release link={link} id={id} />
        </Grid.Col>
      ))}
    </Grid>
  )
}
