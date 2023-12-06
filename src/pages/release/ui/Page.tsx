import React, { useState } from 'react'
import {
  useDeleteReleaseMutation,
  useEditReleaseMutation,
  useGetReleaseByIdQuery
} from '../../../entities/release/api/releaseApi'
import { useParams } from 'react-router-dom'
import { Button, Flex, Image } from '@mantine/core'
import UploadReleaseForm from '../../../widgets/UploadReleaseForm/UploadReleaseForm'

export const ReleasePage: React.FC = () => {
  const { releaseId } = useParams()
  const { data, isError, isLoading } = useGetReleaseByIdQuery({ uid: releaseId })
  const [editRelease] = useEditReleaseMutation()
  const [deleteRelease] = useDeleteReleaseMutation()
  const [isEditingMode, setEditingMode] = useState(false)

  const handleEdit = (): void => {
    setEditingMode(!isEditingMode)
  }

  const uploadRelease = async (formData: FormData): Promise<void> => {
    if (releaseId !== undefined) {
      formData.append('uid', releaseId)
      setEditingMode(false)
      await editRelease(formData)
    }
  }

  const handleDelete = async (): Promise<void> => {
    if (releaseId !== undefined) {
      await deleteRelease({ uid: releaseId })
    }
  }

  if (isError) {
    return <div>Oh no, there was an error</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (data === undefined) {
    return <div>Data is not loading. Call our support tel. 000000</div>
  }

  return (
    <Flex direction="column" align="center" gap="xl">
      <Image h={500} w={500} radius="md" src={data} />
      <Flex w={500} justify="space-around">
        <Button w={200} onClick={handleEdit}>
          Edit
        </Button>
        <Button w={200} onClick={handleDelete}>
          Delete
        </Button>
      </Flex>
      {isEditingMode && <UploadReleaseForm onUpload={uploadRelease} label="Upload release" />}
    </Flex>
  )
}
