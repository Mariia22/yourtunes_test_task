import React, { useState } from 'react'
import {
  useAddReleaseMutation,
  useGetAllReleasesQuery
} from '../../entities/release/api/releaseApi'
import { Release } from '../../entities/release/ui/Release'
import { Button, FileInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { checkReleaseAva } from '../../entities/release/lib/checkReleaseAva'

export const ReleasesPage: React.FC = () => {
  const { data, isLoading, isError } = useGetAllReleasesQuery()
  const [addRelease, error] = useAddReleaseMutation()
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

  console.log(data, error)
  if (isError) {
    return <div>Oh no, there was an error</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (data === undefined || data.length === 0) {
    return null
  }

  return (
    <div>
      {data.map((release) => (
        <Release key={release.uid} avalink={release.avalink} />
      ))}

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
    </div>
  )
}
