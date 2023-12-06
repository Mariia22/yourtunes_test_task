import React, { useState } from 'react'
import { useForm } from '@mantine/form'
import { Button, FileInput, Flex, Loader, Text } from '@mantine/core'
import { checkReleaseAva } from '../../entities/release/lib/checkReleaseAva'

interface FormProps {
  onUpload: (formData: FormData) => void
  label: string
  isLoading: boolean
}

const UploadReleaseForm: React.FC<FormProps> = ({ onUpload, label, isLoading }) => {
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const form = useForm({
    initialValues: { releaseAva: null }
  })

  const handleSubmit = async (values: { releaseAva: null | File }): Promise<void> => {
    const { releaseAva } = values
    if (releaseAva !== null) {
      const errors = await checkReleaseAva(releaseAva)
      setValidationErrors([...errors])

      if (validationErrors.length === 0) {
        const formData = new FormData()
        formData.append('input_ava', releaseAva)
        onUpload(formData)
        form.reset()
      }
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex gap="sm" direction="column">
        <Flex gap="sm" justify="center" align="center">
          <FileInput
            accept="image/png,image/jpg"
            clearable
            w="300px"
            placeholder="Choose a cover for your release"
            rightSection="↑"
            {...form.getInputProps('releaseAva')}
          />
          {isLoading && <Loader size={20} style={{ alignSelf: 'center' }} />}
        </Flex>
        <Button type="submit">{label}</Button>
        <Flex direction="column">
          {validationErrors.length !== 0 &&
            validationErrors.map((error) => <Text key={error}>{error}</Text>)}
        </Flex>
      </Flex>
    </form>
  )
}

export default UploadReleaseForm
