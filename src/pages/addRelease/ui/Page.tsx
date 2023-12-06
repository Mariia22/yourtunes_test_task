import React from 'react'
import UploadReleaseForm from '../../../widgets/UploadReleaseForm/UploadReleaseForm'
import { useAddReleaseMutation } from '../../../entities/release/api/releaseApi'
import { ModalWindow } from '../../../shared/ui/Modal'
import { Button, Flex, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export const AddRealesePage: React.FC = () => {
  const [addRelease, { isLoading, isSuccess, isError, error }] = useAddReleaseMutation()
  const navigate = useNavigate()

  const handleUpload = async (formData: FormData): Promise<void> => {
    await addRelease(formData)
  }

  const handleClick = (): void => {
    navigate('/')
  }

  return (
    <Flex direction="column" justify="center" m="auto">
      <UploadReleaseForm onUpload={handleUpload} label="Add release" isLoading={isLoading} />
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
