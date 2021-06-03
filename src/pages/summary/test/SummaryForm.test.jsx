import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SummaryForm from '../SummaryForm'

test('Checkbox is unchecked by default', async () => {
  render(<SummaryForm />)
  const checkBox = await screen.findByRole('checkbox', {
    name: /terms and conditions/i,
  })
  expect(checkBox).not.toBeChecked()
})

test('Clicking the checkbox enables button and clicking again disables the button', () => {
  render(<SummaryForm />)
  const checkBox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  })
  const button = screen.getByRole('button', { name: /confirm order/i })

  userEvent.click(checkBox)
  expect(button).toBeEnabled()

  userEvent.click(checkBox)
  expect(button).toBeDisabled()
})

test('popover responds to hover', async () => {
  render(<SummaryForm />)
  const nullPopOver = screen.queryByText(
    /no ice cream will actually be delivered/i,
  )
  expect(nullPopOver).not.toBeInTheDocument()

  const termsAndConditions = screen.getByText(/terms and conditions/i)
  userEvent.hover(termsAndConditions)

  const popOver = screen.getByText(/no ice cream will actually be delivered/i)
  expect(popOver).toBeInTheDocument()

  userEvent.unhover(termsAndConditions)
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i),
  )
})
