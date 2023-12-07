import React, { useState } from 'react'
import { useGetReleaseByIdQuery } from '../../../entities/release/api/releaseApi'
import { useParams } from 'react-router-dom'
import { Button, Flex, Image, Loader } from '@mantine/core'
import { skipToken } from '@reduxjs/toolkit/query'
import { EditReleaseComponent } from '../../../widgets/EditRelease/EditRelease'
import { DeleteReleaseComponent } from '../../../widgets/DeleteRelease/DeleteRelease'

export const ReleasePage: React.FC = () => {
  const { releaseId } = useParams()
  const { data, isError, isLoading } = useGetReleaseByIdQuery(releaseId ?? skipToken)
  const [isEditMode, setEditMode] = useState(false)
  const [isDeleteMode, setDeleteMode] = useState(false)

  const handleDelete = (value: boolean): void => {
    setDeleteMode(value)
  }

  const handleEdit = (value: boolean): void => {
    setEditMode(value)
  }

  if (isError) {
    return <div>Oh no, there was an error</div>
  }

  if (isLoading) {
    return <Loader size={50} style={{ alignSelf: 'center', margin: 'auto' }} />
  }

  if (data === undefined) {
    return <div>Data is not loading. Call our support tel. 000000</div>
  }

  return (
    <Flex direction="column" align="center" gap="xl">
      <Image h={500} w={500} radius="md" src={data} />
      <Flex justify="space-around" gap="md">
        <Button
          w={200}
          onClick={() => {
            handleEdit(true)
          }}
        >
          Edit
        </Button>
        <Button
          w={200}
          onClick={() => {
            handleDelete(true)
          }}
        >
          Delete
        </Button>
      </Flex>
      {isEditMode && <EditReleaseComponent id={releaseId} handleEdit={handleEdit} />}
      {isDeleteMode && <DeleteReleaseComponent id={releaseId} handleDelete={handleDelete} />}
    </Flex>
  )
}
