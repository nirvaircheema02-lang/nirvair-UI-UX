import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Nav } from './components/layout/Nav'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { Home } from './pages/Home'
import { AgentPipeline } from './pages/work/AgentPipeline'
import { AmritStudio } from './pages/work/AmritStudio'
import { ArjunRealty } from './pages/work/ArjunRealty'
import { Conversion } from './pages/work/Conversion'
import { DesignSystem } from './pages/work/DesignSystem'
import { KenSurvey } from './pages/work/KenSurvey'
import { MarketIntelligence } from './pages/work/MarketIntelligence'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-canvas text-ink">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* About now lives on the homepage; keep the old path working. */}
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/work/market-intelligence" element={<MarketIntelligence />} />
            <Route path="/work/design-system" element={<DesignSystem />} />
            <Route path="/work/ken-survey" element={<KenSurvey />} />
            <Route path="/work/conversion" element={<Conversion />} />
            <Route path="/work/arjun-realty" element={<ArjunRealty />} />
            <Route path="/work/amrit-studio" element={<AmritStudio />} />
            <Route path="/work/agent-pipeline" element={<AgentPipeline />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
