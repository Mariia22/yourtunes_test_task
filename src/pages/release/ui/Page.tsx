import React, { useState } from 'react'
import {
  useDeleteReleaseMutation,
  useEditReleaseMutation,
  useGetReleaseByIdQuery
} from '../../../entities/release/api/releaseApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Flex, Image, Loader, Text } from '@mantine/core'
import UploadReleaseForm from '../../../widgets/UploadReleaseForm/UploadReleaseForm'
import { ModalWindow } from '../../../shared/ui/Modal'

export const ReleasePage: React.FC = () => {
  const { releaseId } = useParams()
  const { data, isError, isLoading } = useGetReleaseByIdQuery({ uid: releaseId })
  const [editRelease] = useEditReleaseMutation()
  const [deleteRelease] = useDeleteReleaseMutation()
  const [isEditMode, setEditMode] = useState(false)
  const [isDeleteMode, setDeleteMode] = useState(false)
  const navigate = useNavigate()

  const handleEdit = (): void => {
    setEditMode(!isEditMode)
  }

  const handleDelete = (): void => {
    setDeleteMode(true)
  }

  const uploadRelease = async (formData: FormData): Promise<void> => {
    if (releaseId !== undefined) {
      formData.append('uid', releaseId)
      setEditMode(false)
      await editRelease(formData)
    }
  }

  const removeRelease = async (): Promise<void> => {
    if (releaseId !== undefined) {
      await deleteRelease({ uid: releaseId })
      setDeleteMode(false)
      navigate('/')
    }
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
      <Flex w={500} justify="space-around">
        <Button w={200} onClick={handleEdit}>
          Edit
        </Button>
        <Button w={200} onClick={handleDelete}>
          Delete
        </Button>
      </Flex>
      {isEditMode && <UploadReleaseForm onUpload={uploadRelease} label="Upload release" />}
      {isDeleteMode && (
        <ModalWindow isOpened={isDeleteMode}>
          <Text> Are you sure you want to delete the release? </Text>
          <Flex gap="md">
            <Button w={200} onClick={removeRelease}>
              Yes
            </Button>
            <Button w={200} onClick={() => { setDeleteMode(false) }}>
              No
            </Button>
          </Flex>
        </ModalWindow>
      )}
    </Flex>
  )
}
