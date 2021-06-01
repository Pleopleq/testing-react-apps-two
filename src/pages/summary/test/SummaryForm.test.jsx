import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SummaryForm from '../SummaryForm'

test('Checkbox is unchecked by default', async () => {
  render(<SummaryForm></SummaryForm>)
  const checkBox = await screen.findByRole('checkbox', {
    name: /terms and conditions/i,
  })
  expect(checkBox).not.toBeChecked()
})

test('Clicking the checkbox enables button and clicking again disables the button', () => {
  render(<SummaryForm></SummaryForm>)
  const checkBox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  })
  const button = screen.getByRole('button', { name: /confirm order/i })

  userEvent.click(checkBox)
  expect(button).toBeEnabled()

  userEvent.click(checkBox)
  expect(button).toBeDisabled()
})

test('popover responds to hover', () => {})
