import React from 'react'
import UploadReleaseForm from '../../../widgets/UploadReleaseForm/UploadReleaseForm'
import { useAddReleaseMutation } from '../../../entities/release/api/releaseApi'

export const AddRealesePage: React.FC = () => {
  const [addRelease] = useAddReleaseMutation()

  const handleUpload = async (formData: FormData): Promise<void> => {
    await addRelease(formData)
  }

  return <UploadReleaseForm onUpload={handleUpload} label="Add release" />
}
