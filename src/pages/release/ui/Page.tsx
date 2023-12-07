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
import { skipToken } from '@reduxjs/toolkit/query'

export const ReleasePage: React.FC = () => {
  const { releaseId } = useParams()
  const { data, isError, isLoading } = useGetReleaseByIdQuery(releaseId ?? skipToken)
  const [editRelease, { isLoading: isEditLoading, isSuccess, isError: isEditingError, error }] =
    useEditReleaseMutation()
  const [
    deleteRelease,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError
    }
  ] = useDeleteReleaseMutation()
  const [isEditMode, setEditMode] = useState(false)
  const [isDeleteMode, setDeleteMode] = useState(false)
  const navigate = useNavigate()

  const handleEdit = (): void => {
    setEditMode(!isEditMode)
  }

  const handleDelete = (): void => {
    setDeleteMode(true)
  }

  const handleClick = (): void => {
    navigate('/')
  }

  const uploadRelease = async (formData: FormData): Promise<void> => {
    if (releaseId !== undefined) {
      formData.append('uid', releaseId)
      await editRelease(formData)
      setEditMode(false)
    }
  }

  const removeRelease = async (): Promise<void> => {
    if (releaseId !== undefined) {
      await deleteRelease({ uid: releaseId })
      setDeleteMode(false)
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
      {isEditMode && (
        <ModalWindow isOpened={isEditMode}>
          {isEditMode && (
            <UploadReleaseForm
              onUpload={uploadRelease}
              label="Upload release"
              isLoading={isEditLoading}
            />
          )}
        </ModalWindow>
      )}
      {isSuccess && (
        <ModalWindow isOpened={true}>
          <>
            <Text>File is uploaded</Text>
            <Flex gap="md">
              <Button w={200} onClick={handleClick}>
                Go to Main Page
              </Button>
            </Flex>
          </>
        </ModalWindow>
      )}
      {isEditingError && <Text>Upload is failed, error : {(error as Error).message}</Text>}
      {isDeleteMode && (
        <ModalWindow isOpened={isDeleteMode}>
          <Text> Are you sure you want to delete the release? </Text>
          {isDeleteLoading && <Loader size={50} />}
          <Flex gap="md">
            <Button w={200} onClick={removeRelease}>
              Yes
            </Button>
            <Button
              w={200}
              onClick={() => {
                setDeleteMode(false)
              }}
            >
              No
            </Button>
          </Flex>
        </ModalWindow>
      )}
      {isDeleteSuccess && (
        <ModalWindow isOpened={true}>
          <>
            <Text>File is deleted</Text>
            <Flex gap="md">
              <Button w={200} onClick={handleClick}>
                Go to Main Page
              </Button>
            </Flex>
          </>
        </ModalWindow>
      )}
      {isDeleteError && <Text>Upload is failed, error : {(deleteError as Error).message}</Text>}
    </Flex>
  )
}
