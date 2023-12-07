import { Button, Flex, Loader, Text } from '@mantine/core'
import React from 'react'
import { useDeleteReleaseMutation } from '../../entities/release/api/releaseApi'
import { ModalWindow } from '../../shared/ui/Modal'
import { useNavigate } from 'react-router-dom'

type ReleaseProps = {
  id: string | undefined
  handleDelete: (value: boolean) => void
}

export const DeleteReleaseComponent: React.FC<ReleaseProps> = ({ id, handleDelete }) => {

  const navigate = useNavigate()
  const [deleteRelease, { isLoading, isSuccess, isError, error }] = useDeleteReleaseMutation()
  const handleClick = (): void => {
    navigate('/')
  }

  const removeRelease = async (): Promise<void> => {
    if (id !== undefined) {
      await deleteRelease({ uid: id })
      handleDelete(false)
    }
  }

  return (
    <Flex>
      <ModalWindow isOpened={true}>
        <Text> Are you sure you want to delete the release? </Text>
        {isLoading && <Loader size={50} />}
        <Flex gap="md">
          <Button w={200} onClick={removeRelease}>
            Yes
          </Button>
          <Button
            w={200}
            onClick={() => handleDelete(false)}>
            No
          </Button>
        </Flex>
      </ModalWindow>
      {isSuccess && (
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
      {isError && <Text>Upload is failed, error : {(error as Error).message}</Text>}
    </Flex>
  )
}

