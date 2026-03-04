import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import DashboardPreview from '@/components/DashboardPreview'
import InteractiveKanban from '@/components/InteractiveKanban'
import SmartFlows from '@/components/SmartFlows'
import Integrations from '@/components/Integrations'
import FinalCTA from '@/components/FinalCTA'
import EyeTransition from '@/components/EyeTransition'

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
        <EyeTransition childrenA={<Hero />} childrenB={<div id="como-funciona"><ChatDemo /></div>} variant="close" />

        <SetupDemo />
        
        <DashboardPreview />
        
        <InteractiveKanban />
        
        <Integrations />
        
        <SmartFlows />
        
        <div id="comparison">
          <Comparison />
        </div>
        
        <EyeTransition childrenA={<div id="garantia"><Guarantee /></div>} childrenB={<FinalCTA />} variant="open" />
        
        <div id="faq">
          <FAQ />
        </div>
      </div>

      <Footer />
    </main>
  )
}
