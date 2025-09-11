import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { ThemeProvider } from './state/theme'
import { I18nProvider } from './state/i18n'

function Page({ title }: { title: string }) {
  return <div style={{ padding: 24 }}><h1>{title}</h1><p>Lorem ipsum dolor sit amet...</p></div>
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Page title="Home" />} />
          <Route path="/services/web-development" element={<Page title="Web Development" />} />
          <Route path="/services/graphic-design" element={<Page title="Graphic Design" />} />
          <Route path="/services/training-courses" element={<Page title="Training Courses" />} />
          <Route path="/services/mobile-apps" element={<Page title="Mobile Apps" />} />
          <Route path="/services/remote-it-support" element={<Page title="Remote IT Support" />} />
          <Route path="/products/watan" element={<Page title="Watan" />} />
          <Route path="/products/saas-marketplace" element={<Page title="SaaS Marketplace" />} />
          <Route path="/products/courses" element={<Page title="Courses" />} />
          <Route path="/about" element={<Page title="About Technosham" />} />
        </Routes>
      </I18nProvider>
    </ThemeProvider>
  )
}
