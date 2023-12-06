import React, { useState } from 'react'
import { useForm } from '@mantine/form'
import { Button, FileInput } from '@mantine/core'
import { checkReleaseAva } from '../../entities/release/lib/checkReleaseAva'

interface FormProps {
  onUpload: (formData: FormData) => void
  label: string
}

const UploadReleaseForm: React.FC<FormProps> = ({ onUpload, label }) => {
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
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <FileInput
          accept="image/png,image/jpg"
          clearable
          label={label}
          placeholder="Choose a cover for your release"
          {...form.getInputProps('releaseAva')}
        />
        <Button type="submit">{label}</Button>
      </form>
      <div>
        {validationErrors.length !== 0 &&
          validationErrors.map((error) => <div key={error}>{error}</div>)}
      </div>
    </>
  )
}

export default UploadReleaseForm
