import { Button, Flex, Text } from '@mantine/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEditReleaseMutation } from '../../entities/release/api/releaseApi'
import { ModalWindow } from '../../shared/ui/Modal'
import UploadReleaseForm from '../UploadReleaseForm/UploadReleaseForm'

interface ReleaseProps {
  id: string | undefined
  handleEdit: (value: boolean) => void
}

export const EditReleaseComponent: React.FC<ReleaseProps> = ({ id, handleEdit }) => {
  const [editRelease, { isLoading, isSuccess, isError, error }] = useEditReleaseMutation()
  const navigate = useNavigate()

  const uploadRelease = async (formData: FormData): Promise<void> => {
    if (id !== undefined) {
      formData.append('uid', id)
      await editRelease(formData)
      handleEdit(false)
    }
  }

  const handleClick = (): void => {
    navigate('/')
  }

  return (
    <Flex>
      <ModalWindow isOpened={true}>
        <UploadReleaseForm onUpload={uploadRelease} label="Upload release" isLoading={isLoading} />
      </ModalWindow>
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
      {isError && <Text>Upload is failed, error : {(error as Error).message}</Text>}
    </Flex>
  )
}
