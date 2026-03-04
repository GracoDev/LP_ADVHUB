import type { Metadata } from 'next'
import './globals.css'
import MouseTrail from '@/components/MouseTrail'

export const metadata: Metadata = {
  title: 'AdvHub | CRM de IA para Advogados',
  description: 'Plataforma de inteligência artificial que qualifica leads, agenda reuniões e fecha contratos automaticamente via WhatsApp.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="antialiased bg-[#050505] text-white">
        <MouseTrail />
        {children}
      </body>
    </html>
  )
}
