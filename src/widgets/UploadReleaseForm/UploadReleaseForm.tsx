import React from 'react'
import { useForm } from '@mantine/form'
import { Button, FileInput, Flex, Loader } from '@mantine/core'
import { yupResolver } from 'mantine-form-yup-resolver'
import { schema } from './validationSchema'

interface FormProps {
  onUpload: (formData: FormData) => void
  label: string
  isLoading: boolean
}

const UploadReleaseForm: React.FC<FormProps> = ({ onUpload, label, isLoading }) => {
  const form = useForm({
    initialValues: { releaseAva: null },
    validateInputOnChange: true,
    validate: yupResolver(schema)
  })

  const handleSubmit = async (values: { releaseAva: null | File }): Promise<void> => {
    const { releaseAva } = values
    if (releaseAva !== null) {
      const formData = new FormData()
      formData.append('input_ava', releaseAva)
      onUpload(formData)
      form.reset()
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex gap="sm" direction="column">
        <Flex gap="sm" justify="center" align="center">
          <FileInput
            clearable
            w="300px"
            placeholder="Choose a cover for your release"
            rightSection="↑"
            {...form.getInputProps('releaseAva')}
          />
          {isLoading && <Loader size={20} style={{ alignSelf: 'center' }} />}
        </Flex>
        <Button type="submit">{label}</Button>
      </Flex>
    </form>
  )
}

export default UploadReleaseForm
