import React, { useState } from 'react'
import { useAddReleaseMutation } from '../../entities/release/api/releaseApi'
import { useForm } from '@mantine/form'
import { checkReleaseAva } from '../../entities/release/lib/checkReleaseAva'
import { Button, FileInput } from '@mantine/core'

const UploadReleaseForm: React.FC = () => {
  const [addRelease] = useAddReleaseMutation()
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
        form.reset()
        await addRelease(formData)
      }
    }
  }

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <FileInput
          accept="image/png,image/jpg"
          clearable
          label="Add release"
          placeholder="Choose a cover for your release"
          {...form.getInputProps('releaseAva')}
        />
        <Button type="submit">Add release</Button>
      </form>
      <div>
        {validationErrors.length !== 0 &&
          validationErrors.map((error) => <div key={error}>{error}</div>)}
      </div>
    </>
  )
}

export default UploadReleaseForm
