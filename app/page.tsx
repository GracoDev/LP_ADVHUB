import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import DashboardPreview from '@/components/DashboardPreview'
import InteractiveKanban from '@/components/InteractiveKanban'
import SmartFlows from '@/components/SmartFlows'
import Integrations from '@/components/Integrations'
import AnimatedMetrics from '@/components/AnimatedMetrics'
import FinalCTA from '@/components/FinalCTA'

import ChatDemo from '@/components/ChatDemo'
import SetupDemo from '@/components/SetupDemo'
import Comparison from '@/components/Comparison'
import Guarantee from '@/components/Guarantee'
import FAQ from '@/components/FAQ'

export default function Home() {
  return (
    <main className="bg-adv-black min-h-screen">
      <Header />
      
      <div className="flex flex-col gap-0">
        <Hero />
        <div id="como-funciona">
          <ChatDemo />
        </div>

        <SetupDemo />
        
        {/* Dashboard Preview restaurado */}
        <DashboardPreview />
        
        <InteractiveKanban />
        
        <Integrations />
        
        {/* Adicionando SmartFlows abaixo de Integrations */}
        <SmartFlows />
        
        <Comparison />
        <div id="garantia">
          <Guarantee />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        <div id="final-cta">
          <FinalCTA />
        </div>
      </div>

      <Footer />
    </main>
  )
}
