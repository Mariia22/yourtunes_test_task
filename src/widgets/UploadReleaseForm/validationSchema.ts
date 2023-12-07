import * as Yup from 'yup'
import { fileTypes, notifications, requiredSize } from './constants'

export const schema = Yup.object().shape({
  releaseAva: Yup.mixed<File>()
    .required('A file is required')
    .test(
      'fileType',
      notifications.ERROR_FILE_TYPE,
      (value) => !value || (value && fileTypes.includes(value.type))
    )
    .test('isValidSize', notifications.ERROR_FILE_SIZE, async (value) => await checkImage(value))
})

const checkImage = async (provideFile: File): Promise<boolean> => {
  const image = new Image()
  image.src = URL.createObjectURL(provideFile)
  await image.decode()
  const width = image.width
  const height = image.height

  if (
    width !== requiredSize ||
    height !== requiredSize ||
    width / height !== 1
  ) {
    return false
  }
  return true
}
