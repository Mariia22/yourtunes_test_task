import React from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Flex, Modal } from '@mantine/core'

interface ModalWindowProps {
  title?: string
  children: React.ReactNode
  isOpened: boolean
}

export const ModalWindow: React.FC<ModalWindowProps> = ({ title, children, isOpened }) => {
  const [opened, { close }] = useDisclosure(isOpened)

  return (
    <Modal opened={opened} onClose={close} title={title} centered>
      <Flex direction="column" gap="md" align="center">
        {children}
      </Flex>
    </Modal>
  )
}
