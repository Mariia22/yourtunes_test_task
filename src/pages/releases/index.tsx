import React from 'react'
import {
  useAddReleaseMutation,
  useGetAllReleasesQuery
} from '../../entities/release/api/releaseApi'
import { Release } from '../../entities/release/ui/Release'
import { Button, FileInput } from '@mantine/core'
import { useForm } from '@mantine/form'

export const ReleasesPage: React.FC = () => {
  const { data, isLoading, isError } = useGetAllReleasesQuery()
  const [addRelease, error] = useAddReleaseMutation()

  const form = useForm({
    initialValues: { releaseAva: null }
  })
  type FormValues = typeof form.values

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const formData = new FormData()
    const { releaseAva } = values
    if (releaseAva !== null && !releaseAva) {
      formData.append('input_ava', releaseAva)
      await addRelease(formData)
    }
  }
  console.log(error)
  if (isError) {
    return <div>Oh no, there was an error</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (data === undefined || data.length !== 0) {
    return null
  }

  return (
    <div>
      {data.map((release) => (
        <Release key={release.uid} />
      ))}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <FileInput
          label="Add release"
          placeholder="Choose a cover for your release"
          {...form.getInputProps('releaseAva')}
        />
        <Button type="submit">Add release</Button>
      </form>
    </div>
  )
}
