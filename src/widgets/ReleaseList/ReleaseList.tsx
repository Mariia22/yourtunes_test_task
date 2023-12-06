import React from 'react'
import { useGetAllReleasesQuery } from '../../entities/release/api/releaseApi'
import { Box, Loader, SimpleGrid } from '@mantine/core'
import { Release } from '../../entities/release/ui/Release'

export const ReleaseList: React.FC = () => {
  const { data, isLoading, isError } = useGetAllReleasesQuery()

  if (isError) {
    return <div>Oh no, there was an error</div>
  }

  if (isLoading) {
    return <Loader size={50} style={{ alignSelf: 'center', margin: 'auto' }} />
  }

  if (data === undefined || data.length === 0) {
    return null
  }

  return (
    <SimpleGrid cols={3}>
      {data.map(({ uid: id, ava_link: link }) => (
        <Box key={id}>
          <Release link={link} id={id} />
        </Box>
      ))}
    </SimpleGrid>
  )
}
