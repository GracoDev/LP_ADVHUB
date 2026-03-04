'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, FileSignature, Check, Clock, MessageSquare, Smartphone, CheckCircle2, FileText, Download, MousePointer2, MoreHorizontal, Send, User } from 'lucide-react'
import Logo from './Logo'

// Componente PhoneFrame unificado (Visual ChatDemo)
const PhoneFrame = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-adv-dark border border-white/10 rounded-[2.5rem] shadow-2xl shadow-[0_0_40px_rgba(255,184,77,0.08)] overflow-hidden relative h-[550px] w-full max-w-[400px] flex flex-col mx-auto ${className}`}>
    {/* Status Bar Mock */}
    <div className="h-7 bg-adv-black/50 w-full flex justify-between items-center px-6 text-[10px] text-white/50 shrink-0">
      <span>19:12</span>
      <div className="flex gap-1">
        <div className="w-3 h-3 bg-white/20 rounded-full" />
        <div className="w-3 h-3 bg-white/20 rounded-full" />
      </div>
    </div>
    {children}
  </div>
)

export default function Integrations() {
  const [step, setStep] = useState(0)
  const [zapStep, setZapStep] = useState(0)

  // Ciclo de animação do Calendar/WhatsApp
  // 0: WhatsApp (User Msg)
  // 1: WhatsApp (Typing)
  // 2: WhatsApp (AI Reply)
  // 3: Transition (Fade out WA, Fade in Calendar)
  // 4: Calendar (Event Appears)
  // 5: Calendar (Event Confirmed)
  // 6: Wait & Reset

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        setStep(0) // Start: WhatsApp visible
        await new Promise(r => setTimeout(r, 1000)) // Wait for user msg
        
        setStep(1) // Typing
        await new Promise(r => setTimeout(r, 1500))
        
        setStep(2) // AI Reply
        await new Promise(r => setTimeout(r, 2000))
        
        setStep(3) // Transition start
        await new Promise(r => setTimeout(r, 1000)) // Allow fade transition
        
        setStep(4) // Calendar visible, Event appears
        await new Promise(r => setTimeout(r, 1500))
        
        setStep(5) // Event Confirmed
        await new Promise(r => setTimeout(r, 3000)) // Hold final state
      }
    }
    sequence()
  }, [])

  // Ciclo de animação do ZapSign
  // 0: Chat View (Initial)
  // 1: Contract Msg Arrives
  // 2: Clicking/Downloading (Transition to Doc)
  // 3: Document View (Top)
  // 4: Scrolling Down
  // 5: Signing
  // 6: Success
  // 7: Reset

  useEffect(() => {
    const zapSequence = async () => {
      while (true) {
        setZapStep(0) // Chat view
        await new Promise(r => setTimeout(r, 1000))

        setZapStep(1) // Contract msg arrives
        await new Promise(r => setTimeout(r, 2000))

        setZapStep(2) // Click animation
        await new Promise(r => setTimeout(r, 500))

        setZapStep(3) // Show Document Top
        await new Promise(r => setTimeout(r, 1000))

        setZapStep(4) // Scroll Down
        await new Promise(r => setTimeout(r, 4000)) // Increased scroll time

        setZapStep(5) // Signing
        await new Promise(r => setTimeout(r, 2000))

        setZapStep(6) // Success
        await new Promise(r => setTimeout(r, 3000))
      }
    }
    zapSequence()
  }, [])

  return (
    <section id="integracoes" className="py-32 bg-[#050505] relative border-t border-white/5 overflow-hidden">
      {/* Orbes radiais douradas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[#FFB84D]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[-15%] left-[20%] w-[450px] h-[450px] bg-[#F3CEA1]/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] bg-[#FFB84D]/8 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Conectado ao seu <span className="text-[#F3CEA1]">fluxo de trabalho</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A IA atua onde seu cliente está (WhatsApp) e organiza onde você precisa (Agenda e Contratos).
          </p>
        </div>

        {/* -------------------- SECTION 1: GOOGLE CALENDAR -------------------- */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          
            {/* Lado Esquerdo: Explicação Calendar */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Calendar className="w-3 h-3" />
              Integração Premium
            </div>
            
            <div className="flex items-center gap-4 mb-4">
               {/* Google Calendar Logo */}
               <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="6" width="18" height="15" rx="2" fill="white"/>
                  <path d="M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10V11H3V10Z" fill="#4285F4"/>
                  <path d="M7 3V6" stroke="#1967D2" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M17 3V6" stroke="#1967D2" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="7" y="14" width="2" height="2" rx="0.5" fill="#4285F4"/>
                  <rect x="11" y="14" width="2" height="2" rx="0.5" fill="#4285F4"/>
                  <rect x="15" y="14" width="2" height="2" rx="0.5" fill="#4285F4"/>
                  <rect x="7" y="17" width="2" height="2" rx="0.5" fill="#4285F4"/>
                  <rect x="11" y="17" width="2" height="2" rx="0.5" fill="#4285F4"/>
                  <rect x="15" y="17" width="2" height="2" rx="0.5" fill="#4285F4"/>
               </svg>
               <h3 className="text-3xl font-bold text-white">
                  Google Calendar
               </h3>
            </div>
            
            <h3 className="text-xl font-medium text-white/80 mb-4">
              Agendamento Automático via WhatsApp
            </h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Esqueça o &quot;vai e vem&quot; de horários. A IA negocia o melhor horário com o cliente no WhatsApp e insere diretamente na sua agenda do Google.
            </p>
            <ul className="space-y-4">
              {[
                'Sincronização bidirecional em tempo real',
                'Detecção inteligente de fuso horário',
                'Lembretes automáticos para reduzir no-show'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Lado Direito: Demo Interativa Calendar */}
          <div className="order-1 lg:order-2 relative h-[500px] w-full flex items-center justify-center">
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[#F3CEA1]/10 blur-[100px] rounded-full" />

            {/* Container da Simulação */}
            <div className="relative w-full h-full max-w-[400px] mx-auto flex items-center justify-center">
              
              {/* 1. Interface do Calendar (Fundo -> Frente) */}
              <motion.div 
                className="absolute w-full max-w-[360px] h-[320px] bg-[#0F0F0F] rounded-xl border border-white/10 shadow-2xl overflow-hidden z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: step >= 3 ? 1 : 0,
                  scale: step >= 3 ? 1 : 0.9,
                  filter: step >= 3 ? 'blur(0px)' : 'blur(10px)'
                }}
                transition={{ duration: 0.8 }}
              >
                {/* Header Calendar */}
                <div className="h-10 border-b border-white/5 flex items-center px-4 justify-between bg-[#141414]">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-xs text-slate-500">calendar.google.com</span>
                </div>
                {/* Grid Calendar */}
                <div className="p-4 grid grid-cols-1 gap-4">
                  <div className="flex justify-between text-xs text-slate-500 border-b border-white/5 pb-2">
                    <span>09:00</span>
                    <span className="text-white/10">---------------------------</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 border-b border-white/5 pb-2">
                    <span>10:00</span>
                    <span className="text-white/10">---------------------------</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 border-b border-white/5 pb-2 relative h-[40px] items-start pt-1">
                    <span className="mr-4">14:00</span>
                    <span className="text-white/10 w-full border-t border-dashed border-white/10 mt-2"></span>
                    
                    {/* O EVENTO QUE APARECE */}
                    <AnimatePresence>
                      {step >= 4 && (
                        <motion.div 
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: '100%' }}
                          transition={{ duration: 0.5 }}
                          className="absolute top-0 left-12 right-0 bottom-1 border-l-2 border-green-500 bg-green-500/20 p-2 rounded-r-md flex items-center justify-between"
                        >
                          <div>
                            <p className="text-[10px] font-bold text-green-100 leading-tight">
                              Reunião confirmada via AdvHub com cliente Carlos
                            </p>
                          </div>
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-green-500 rounded-full p-0.5 mr-1"
                          >
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 border-b border-white/5 pb-2">
                    <span>15:00</span>
                    <span className="text-white/10">---------------------------</span>
                  </div>
                </div>
              </motion.div>

              {/* 2. Interface do WhatsApp (Frente -> Fundo) */}
              <motion.div 
                className="absolute z-20"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ 
                  opacity: step >= 3 ? 0 : 1,
                  scale: step >= 3 ? 1.1 : 1,
                  filter: step >= 3 ? 'blur(10px)' : 'blur(0px)'
                }}
                transition={{ duration: 0.8 }}
              >
                <PhoneFrame className="h-[550px] w-[320px]">
                  {/* Header WA */}
                  <div className="bg-adv-card border-b border-white/5 p-4 flex items-center gap-3 z-10">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-xs">
                        CS
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-adv-card rounded-full" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm">Carlos Silva</h3>
                      <p className="text-adv-gold text-xs">Online agora</p>
                    </div>
                    <MoreHorizontal className="w-5 h-5 text-gray-500 ml-auto" />
                  </div>

                  {/* Chat Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-adv-black scrollbar-hide">
                    {/* Mensagem Cliente */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-adv-card border border-white/5 p-3 rounded-2xl rounded-tr-none text-gray-200 self-start max-w-[85%]"
                    >
                      <p className="text-sm">Gostaria de agendar para sexta às 14h.</p>
                      <span className="text-[10px] text-gray-500 block text-right mt-1">10:42</span>
                    </motion.div>

                    {/* Mensagem IA */}
                    <AnimatePresence>
                      {step >= 2 && (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-adv-gold/10 border border-adv-gold/20 p-3 rounded-2xl rounded-tl-none text-adv-gold/90 self-end ml-auto max-w-[85%]"
                        >
                          <p className="text-sm">Combinado! Vou reservar na agenda.</p>
                          <div className="flex justify-end items-center gap-1 mt-1 opacity-50">
                            <span className="text-[10px]">10:42</span>
                            <Check className="w-3 h-3" />
                          </div>
                          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-adv-gold/20">
                            <Logo className="h-3 w-auto opacity-80" />
                            <span className="text-[8px] text-adv-gold/70 uppercase tracking-wider">Enviado automaticamente</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Input Area Mock */}
                  <div className="p-3 bg-adv-card border-t border-white/5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <span className="text-gray-400 text-lg">+</span>
                    </div>
<div className="flex-1 bg-adv-black rounded-full h-9 border border-white/5 px-4 flex items-center text-xs text-gray-600 shadow-[0_0_12px_rgba(255,184,77,0.05)]">
                          Mensagem
                        </div>
                    <div className="w-9 h-9 rounded-full bg-adv-gold/20 flex items-center justify-center">
                      <Send className="w-4 h-4 text-adv-gold" />
                    </div>
                  </div>
                </PhoneFrame>
              </motion.div>

            </div>
          </div>
        </div>

        {/* -------------------- SECTION 2: ZAPSIGN -------------------- */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-32">
          
          {/* Lado Esquerdo: Demo ZapSign (Updated) */}
          <div className="order-1 relative w-full flex items-center justify-center min-h-[550px]">
             <div className="relative z-20 w-full max-w-[400px] mx-auto flex justify-center">
                {/* Single Phone Frame with Internal Transitions */}
                <PhoneFrame className="h-[550px] !w-[320px] !max-w-[320px] shrink-0">
                  <div className="relative flex-1 overflow-hidden">
                    {/* 1. VIEW CHAT */}
                    <motion.div 
                      className="absolute inset-0 z-30 flex flex-col bg-adv-black"
                      animate={{ x: zapStep >= 3 ? '-100%' : '0%' }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      {/* Header WA */}
                      <div className="bg-adv-card border-b border-white/5 p-4 flex items-center gap-3 z-10">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-adv-gold to-orange-600 flex items-center justify-center text-white font-bold text-xs">
                            AH
                          </div>
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-adv-card rounded-full" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-sm">AdvHub AI</h3>
                          <p className="text-adv-gold text-xs">Online agora</p>
                        </div>
                        <MoreHorizontal className="w-5 h-5 text-gray-500 ml-auto" />
                      </div>
                      
                      {/* Chat Content */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-adv-black scrollbar-hide">
                        {/* Contrato Msg */}
                        <AnimatePresence>
                          {zapStep >= 1 && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-adv-gold/10 border border-adv-gold/20 p-3 rounded-2xl rounded-tl-none self-end ml-auto max-w-[85%] cursor-pointer group/msg"
                            >
                              <div className="flex items-center gap-3 mb-2 bg-black/20 p-2 rounded-lg">
                                <div className="bg-white p-1 rounded">
                                  <FileText className="w-5 h-5 text-red-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[10px] text-white font-medium truncate">Contrato_Prestacao.pdf</p>
                                  <p className="text-[8px] text-white/60">3 páginas • 120 KB</p>
                                </div>
                                <Download className="w-4 h-4 text-white/60" />
                              </div>
                              <p className="text-sm text-adv-gold/90">Olá! Segue o contrato para assinatura.</p>
                              <div className="flex justify-end items-center gap-1 mt-1 opacity-50">
                                <span className="text-[10px]">11:05</span>
                                <Check className="w-3 h-3" />
                              </div>
                              <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-adv-gold/20">
                                <Logo className="h-3 w-auto opacity-80" />
                                <span className="text-[8px] text-adv-gold/70 uppercase tracking-wider">Enviado automaticamente</span>
                              </div>

                              {/* Finger/Click Hint */}
                              {zapStep === 2 && (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="absolute -bottom-2 -right-2 bg-white/20 p-1 rounded-full"
                                >
                                  <div className="w-4 h-4 rounded-full bg-white/50 animate-ping" />
                                </motion.div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Input Area Mock */}
                      <div className="p-3 bg-adv-card border-t border-white/5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                          <span className="text-gray-400 text-lg">+</span>
                        </div>
                        <div className="flex-1 bg-adv-black rounded-full h-9 border border-white/5 px-4 flex items-center text-xs text-gray-600 shadow-[0_0_12px_rgba(255,184,77,0.05)]">
                          Mensagem
                        </div>
                        <div className="w-9 h-9 rounded-full bg-adv-gold/20 flex items-center justify-center">
                          <Send className="w-4 h-4 text-adv-gold" />
                        </div>
                      </div>
                    </motion.div>

                    {/* 2. VIEW DOCUMENT */}
                    <motion.div 
                      className="absolute inset-0 bg-adv-dark flex flex-col"
                      initial={{ x: '100%' }}
                      animate={{ x: zapStep >= 3 ? '0%' : '100%' }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      {/* Doc Header */}
                      <div className="bg-adv-card p-3 border-b border-white/10 flex items-center justify-between z-10 text-white shrink-0">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-red-500 rounded" />
                          <span className="text-[10px] font-bold text-white">Contrato.pdf</span>
                        </div>
                        <div className="text-[8px] text-gray-500">1 de 3</div>
                      </div>

                      {/* Doc Content */}
                      <div className="flex-1 relative overflow-hidden bg-adv-black">
                        <motion.div 
                          className="absolute top-0 left-0 right-0 p-4 space-y-4"
                          animate={{ y: zapStep >= 4 ? -130 : 0 }} 
                          transition={{ duration: 4, ease: "linear", delay: 0.5 }}
                        >
                          {/* Realistic Contract Text */}
                          <div className="space-y-3">
                            <p className="text-[6px] text-white font-bold uppercase mb-2">Contrato de Prestação de Serviços Jurídicos</p>
                            
                            <p className="text-[5px] text-gray-400 leading-relaxed text-justify">
                              Pelo presente instrumento particular, de um lado <strong>ADVHUB SOLUÇÕES JURÍDICAS</strong>, doravante denominado CONTRATADO, e de outro lado o cliente qualificado no cadastro, denominado CONTRATANTE, têm entre si justo e contratado o seguinte:
                            </p>
                            
                            <p className="text-[5px] text-gray-400 leading-relaxed text-justify">
                              <strong>CLÁUSULA PRIMEIRA - DO OBJETO</strong><br/>
                              O presente contrato tem como objeto a prestação de serviços de advocacia na área cível, especificamente para acompanhamento de processo judicial e consultoria preventiva.
                            </p>

                            <p className="text-[5px] text-gray-400 leading-relaxed text-justify">
                              <strong>CLÁUSULA SEGUNDA - DOS HONORÁRIOS</strong><br/>
                              Pelos serviços prestados, o CONTRATANTE pagará ao CONTRATADO o valor estipulado na proposta comercial anexa, sendo 30% no ato da assinatura e o restante ao final do processo (êxito).
                            </p>

                            <p className="text-[5px] text-gray-400 leading-relaxed text-justify">
                              <strong>CLÁUSULA TERCEIRA - DAS OBRIGAÇÕES</strong><br/>
                              O CONTRATADO compromete-se a agir com zelo e dedicação, utilizando todos os meios jurídicos cabíveis para a defesa dos interesses do CONTRATANTE.
                            </p>

                            <p className="text-[5px] text-gray-400 leading-relaxed text-justify">
                              <strong>CLÁUSULA QUARTA - DA RESCISÃO</strong><br/>
                              O contrato poderá ser rescindido por qualquer das partes, mediante aviso prévio de 30 dias, sem prejuízo dos honorários proporcionais aos serviços já realizados.
                            </p>
                            
                            <p className="text-[5px] text-gray-400 leading-relaxed text-justify">
                              <strong>CLÁUSULA QUINTA - DO FORO</strong><br/>
                              Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer dúvidas oriundas deste contrato.
                            </p>
                             <p className="text-[5px] text-gray-400 leading-relaxed text-justify">
                              <strong>CLÁUSULA SEXTA - DA CONFIDENCIALIDADE</strong><br/>
                               As partes comprometem-se a manter sigilo absoluto sobre todas as informações trocadas durante a vigência deste contrato, sob pena de responsabilização civil e criminal.
                            </p>
                             <p className="text-[5px] text-gray-400 leading-relaxed text-justify">
                              <strong>CLÁUSULA SÉTIMA - DA VIGÊNCIA</strong><br/>
                               O presente contrato entra em vigor na data de sua assinatura eletrônica e terá validade até a conclusão definitiva do processo ou serviço contratado.
                            </p>
                          </div>

                          {/* ZapSign Signature Area */}
                          <div className="pt-8 mt-8 border-t border-white/10">
                            <p className="text-[8px] font-bold text-white mb-4">ASSINATURA DO CONTRATANTE</p>
                            
                            <div className="relative bg-adv-card border border-white/10 rounded-md p-4 flex flex-col items-center justify-center gap-2 min-h-[100px]">
                              {zapStep < 6 && (
                                <>
                                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-1">
                                    <FileSignature className="w-4 h-4 text-white" />
                                  </div>
                                  <p className="text-[8px] text-gray-400 font-medium">Clique para assinar digitalmente</p>
                                  <p className="text-[6px] text-gray-500">IP: 192.168.1.1 • Data: 03/03/2026</p>
                                </>
                              )}

                              {zapStep >= 5 && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                   <svg className="w-[80%] h-[60%]" viewBox="0 0 200 100">
                                    <motion.path
                                      d="M 20 60 C 20 60 40 20 50 40 C 60 70 30 80 40 60 C 50 40 90 30 110 50 C 130 70 120 90 140 80 C 160 70 180 50 190 60"
                                      fill="transparent"
                                      stroke="#ffffff"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      initial={{ pathLength: 0, opacity: 0 }}
                                      animate={{ pathLength: 1, opacity: 1 }}
                                      transition={{ duration: 1.2, ease: "easeInOut" }}
                                    />
                                  </svg>
                                </div>
                              )}

                              <AnimatePresence>
                                {zapStep >= 6 && (
                                  <motion.div 
                                    initial={{ scale: 2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute inset-0 bg-green-950/90 flex items-center justify-center"
                                  >
                                    <div className="border-2 border-green-500 text-green-400 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                      <Check className="w-3 h-3" />
                                      Assinado
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            
                            <div className="mt-4 flex justify-between items-center">
                                <div className="h-1 w-16 bg-white/20 rounded"/>
                                 <div className="h-4 w-4 bg-white/20 rounded-full"/>
                            </div>
                          </div>
                          
                          <div className="h-32" /> 
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </PhoneFrame>
             </div>
          </div>

          {/* Lado Direito: Explicação ZapSign */}
          <div className="order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-6">
              <FileSignature className="w-3 h-3" />
              Integração Premium
            </div>

            <div className="flex items-center gap-4 mb-4">
               {/* ZapSign Logo Mock (Stylized Z) */}
               <div className="w-12 h-12 bg-[#00D09E] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,208,158,0.3)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
               </div>
               <h3 className="text-3xl font-bold text-white">
                  ZapSign
               </h3>
            </div>

            <h3 className="text-xl font-medium text-white/80 mb-4">
              Contratos Assinados no WhatsApp
            </h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Reduza o tempo de fechamento de dias para minutos. A IA gera o contrato, envia o link e cobra a assinatura, tudo automaticamente.
            </p>
            <ul className="space-y-4">
              {[
                'Geração automática de minutas',
                'Validade jurídica completa',
                'Armazenamento seguro na nuvem'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  )
}
