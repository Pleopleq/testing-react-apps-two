import { findAllByRole, render, screen } from '@testing-library/react'
import Options from '../Options'
import ToppingOptions from '../ToppingOptions'

test('Displays image for each scoop from server', async () => {
  render(<Options optionType="scoops" />)
  //find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2)

  const altTextImgs = scoopImages.map((scoop) => scoop.alt)
  expect(altTextImgs).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('Displays image for each topping from server', async () => {
  render(<Options optionType="toppings" />)

  // find images, expect 3 based on what msw returns
  const images = await screen.findAllByRole('img', { name: /topping$/i })
  expect(images).toHaveLength(3)

  //check the alt text for the images
  const imagesTitles = images.map((img) => img.alt)
  expect(imagesTitles).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ])
})
