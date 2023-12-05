export const checkReleaseAva = async (file: File): Promise<string[]> => {
  const errors: string[] = []
  const image = new Image()
  image.src = URL.createObjectURL(file)
  await image.decode()
  const { width, height } = image

  if (height !== width) {
    errors.push('Соотношение сторон должно быть 1:1')
  }

  if (height !== 3000) {
    errors.push('Высота должна быть равна 3000px')
  }

  if (width !== 3000) {
    errors.push('Ширина должна быть равна 3000px')
  }

  if (file.type === 'image/png' || file.type === 'image/jpeg') {
    return errors
  } else {
    errors.push('Tип файла должен быть .jpg или .png')
  }
  return errors
}
