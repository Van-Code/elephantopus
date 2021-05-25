import App from "./App";
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

test('loads and displays loading', async () => {
  render(<App />)

  expect(document.querySelector('main')).toHaveTextContent('Loading...')
})

