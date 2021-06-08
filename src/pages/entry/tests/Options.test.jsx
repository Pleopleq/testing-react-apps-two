import { render, screen } from '@testing-library/react'
import Options from '../Options'

test('Displays image for each scoop from server', async () => {
  render(<Options optionType="scoops" />)
  //find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2)

  const altTextImgs = scoopImages.map((scoop) => scoop.alt)
  expect(altTextImgs).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})
