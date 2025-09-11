import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from './Header'
import { ThemeProvider } from '../state/theme'
import { I18nProvider } from '../state/i18n'

describe('Header', () => {
  it('renders brand', () => {
    const r = render(
      <MemoryRouter>
        <ThemeProvider>
          <I18nProvider>
            <Header />
          </I18nProvider>
        </ThemeProvider>
      </MemoryRouter>
    )
    expect(r.getByText('Technosham')).toBeTruthy()
  })
})
