'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { QrCode, Smartphone, Check, Laptop, Wifi, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function SetupDemo() {
  const [step, setStep] = useState(0)
  const [typedEmail, setTypedEmail] = useState("")
  const [typedPassword, setTypedPassword] = useState("")

  const fullEmail = "usuario@advhub.com.br"
  const fullPassword = "••••••••"

  // Ciclo de animação:
  // 0: Tela de Login (Início)
  // 1: Digitando Email
  // 2: Digitando Senha
  // 3: Loading (Spinner)
  // 4: QR Code aparece na tela + Linhas de velocidade (Agilidade)
  // 5: Celular sobe para escanear
  // 6: Escaneando (Barra descendo)
  // 7: Conectado (Sucesso)
  // 8: Dashboard (Prévia do Kanban/Gráficos)
  // 9: Reset e Reinicia

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        setStep(0)
        setTypedEmail("")
        setTypedPassword("")
        await new Promise(r => setTimeout(r, 1000))
        
        // Digitando Email
        setStep(1)
        for (let i = 0; i <= fullEmail.length; i++) {
            setTypedEmail(fullEmail.slice(0, i))
            await new Promise(r => setTimeout(r, 50)) // Velocidade de digitação
        }
        await new Promise(r => setTimeout(r, 300))

        // Digitando Senha
        setStep(2)
        for (let i = 0; i <= fullPassword.length; i++) {
            setTypedPassword(fullPassword.slice(0, i))
            await new Promise(r => setTimeout(r, 50))
        }
        await new Promise(r => setTimeout(r, 500))
        
        setStep(3) // Loading
        await new Promise(r => setTimeout(r, 1000))
        
        setStep(4) // QR Code + Speed Lines
        await new Promise(r => setTimeout(r, 1000))
        
        setStep(5) // Celular sobe
        await new Promise(r => setTimeout(r, 1000))
        
        setStep(6) // Escaneando
        await new Promise(r => setTimeout(r, 2000))
        
        setStep(7) // Sucesso (Conectado)
        await new Promise(r => setTimeout(r, 1500))

        setStep(8) // Dashboard
        await new Promise(r => setTimeout(r, 6000))
      }
    }
    sequence()
  }, [])

  return (
    <section className="py-24 bg-adv-black relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Lado Esquerdo: Texto */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Wifi className="w-3 h-3" />
                Setup Instantâneo
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Conecte seu WhatsApp <br/>
                <span className="text-adv-gold">em menos de 1 minuto.</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Sem configurações complexas ou necessidade de TI. Basta fazer login na plataforma e escanear o QR Code, como no WhatsApp Web.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Conexão oficial e segura",
                  "Mantém seu número atual",
                  "Sincronização imediata de conversas",
                  "Multi-atendentes no mesmo número"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-adv-gold/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-adv-gold" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Lado Direito: Animação Notebook + Celular */}
          <div className="order-1 lg:order-2 flex justify-center perspective-[2000px] relative">
            
            {/* Speed Lines Animation - Indica rapidez */}
            <AnimatePresence>
                {step >= 3 && (
                    <motion.div 
                        className="absolute inset-0 z-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-[2px] bg-adv-gold/30 rounded-full"
                                style={{
                                    top: `${20 + i * 15}%`,
                                    left: -100,
                                    right: -100,
                                }}
                                animate={{
                                    x: ['-100%', '100%'],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: "linear"
                                }}
                            />
                        ))}

                        {/* Raios de velocidade */}
                        <motion.div
                            className="absolute top-1/4 right-0 text-adv-gold/40"
                            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.2 }}
                        >
                            <Zap className="w-8 h-8 rotate-12" />
                        </motion.div>
                        <motion.div
                            className="absolute bottom-1/4 left-0 text-adv-gold/40"
                            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.3 }}
                        >
                            <Zap className="w-6 h-6 -rotate-12" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative w-full max-w-[500px] h-[350px] z-10">
              
              {/* NOTEBOOK */}
              <motion.div 
                className="absolute inset-0 bg-[#1a1a1a] rounded-xl border border-white/10 shadow-2xl shadow-[0_0_35px_rgba(255,184,77,0.08)] overflow-hidden flex flex-col"
                initial={{ rotateX: 10 }}
                animate={{ rotateX: 0 }}
                transition={{ duration: 1 }}
              >
                {/* Tela do Notebook */}
                <div className="flex-1 bg-[#0f0f0f] relative overflow-hidden flex items-center justify-center p-8">
                  
                  {/* Cenário 1: Login */}
                  <motion.div 
                    className="w-full max-w-[280px] space-y-4"
                    animate={{ opacity: step < 3 ? 1 : 0, pointerEvents: step < 3 ? 'auto' : 'none' }}
                  >
                     <div className="flex justify-center mb-6">
                        <div className="w-10 h-10 rounded-full bg-adv-gold flex items-center justify-center font-bold text-black">AH</div>
                     </div>
                     <div className="relative h-10 bg-white/5 rounded border border-white/10 w-full flex items-center px-3 text-gray-400 text-sm overflow-hidden shadow-[0_0_15px_rgba(255,184,77,0.05)]">
                        <span className={step >= 1 ? "text-white" : "text-gray-600"}>
                            {typedEmail || "E-mail"}
                        </span>
                        {step === 1 && (
                            <motion.span 
                                animate={{ opacity: [0, 1, 0] }} 
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-[2px] h-4 bg-adv-gold ml-1"
                            />
                        )}
                     </div>
                     <div className="relative h-10 bg-white/5 rounded border border-white/10 w-full flex items-center px-3 text-gray-400 text-sm overflow-hidden shadow-[0_0_15px_rgba(255,184,77,0.05)]">
                        <span className={step >= 2 ? "text-white tracking-widest" : "text-gray-600"}>
                            {typedPassword || "Senha"}
                        </span>
                        {step === 2 && (
                            <motion.span 
                                animate={{ opacity: [0, 1, 0] }} 
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-[2px] h-4 bg-adv-gold ml-1"
                            />
                        )}
                     </div>
                     <div className="h-10 bg-adv-gold rounded w-full flex items-center justify-center text-black font-bold text-sm shadow-lg shadow-adv-gold/20 transform active:scale-95 transition-transform">
                        Entrar
                     </div>
                  </motion.div>

                  {/* Cenário 2: Loading */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center bg-[#0f0f0f]"
                    animate={{ opacity: step === 3 ? 1 : 0 }}
                  >
                    <div className="w-8 h-8 border-2 border-adv-gold border-t-transparent rounded-full animate-spin" />
                  </motion.div>

                  {/* Cenário 3: QR Code (Dashboard) */}
                  <motion.div 
                    className="absolute inset-0 bg-[#0f0f0f] flex flex-col items-center justify-center"
                    animate={{ opacity: step >= 4 ? 1 : 0 }}
                  >
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        Escaneie para conectar
                        {step >= 4 && step < 7 && <Zap className="w-4 h-4 text-adv-gold animate-pulse" />}
                    </h3>
                    <div className="p-4 bg-white rounded-xl relative overflow-hidden">
                      <QrCode className="w-32 h-32 text-black" />
                      
                      {/* Scanner Line (Visual Feedback no PC também) */}
                      {step >= 6 && step < 7 && (
                        <motion.div 
                          className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_10px_#22c55e]"
                          animate={{ top: ['0%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                      )}

                      {/* Success Overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-white/90 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: step >= 7 ? 1 : 0 }}
                      >
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                    </div>
                    <p className="text-gray-500 text-xs mt-4">Abra o WhatsApp {'>'} Menu {'>'} Aparelhos conectados</p>
                  </motion.div>

                  {/* Cenário 4: Dashboard Preview (Pós-conexão) */}
                  <motion.div 
                    className="absolute inset-0 bg-[#0f0f0f] flex flex-col p-4 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: step === 8 ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Header Mini Dashboard */}
                    <div className="w-full h-8 border-b border-white/10 flex items-center justify-between mb-4">
                        <div className="text-[10px] text-gray-400 font-bold">DASHBOARD</div>
                        <div className="flex gap-2">
                             <div className="w-2 h-2 rounded-full bg-red-500"/>
                             <div className="w-2 h-2 rounded-full bg-yellow-500"/>
                             <div className="w-2 h-2 rounded-full bg-green-500"/>
                        </div>
                    </div>
                    
                    {/* Charts Grid */}
                    <div className="w-full grid grid-cols-2 gap-2 mb-2">
                        <div className="bg-white/5 rounded p-2 h-20 relative overflow-hidden">
                             <div className="text-[8px] text-gray-500 mb-1">Novos Leads</div>
                             <div className="text-lg font-bold text-white">124</div>
                             <div className="absolute bottom-0 left-0 w-full h-8 opacity-30">
                                <svg viewBox="0 0 100 20" className="w-full h-full">
                                    <path d="M0,20 Q20,5 40,15 T100,0 V20 H0 Z" fill="#F3CEA1" />
                                </svg>
                             </div>
                        </div>
                        <div className="bg-white/5 rounded p-2 h-20 relative overflow-hidden">
                             <div className="text-[8px] text-gray-500 mb-1">Conversão</div>
                             <div className="text-lg font-bold text-green-400">32%</div>
                             <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
                                <motion.div 
                                    className="h-full bg-green-500" 
                                    initial={{ width: 0 }}
                                    animate={{ width: step === 8 ? '32%' : 0 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                             </div>
                        </div>
                    </div>

                    {/* Mini Kanban */}
                    <div className="w-full flex gap-1 h-full overflow-hidden opacity-50">
                        <div className="flex-1 bg-white/5 rounded-t p-1 space-y-1">
                             <div className="w-full h-1 bg-gray-700 rounded mb-1"/>
                             <div className="w-full h-6 bg-white/10 rounded"/>
                             <div className="w-full h-6 bg-white/10 rounded"/>
                        </div>
                        <div className="flex-1 bg-white/5 rounded-t p-1 space-y-1">
                             <div className="w-full h-1 bg-adv-gold/50 rounded mb-1"/>
                             <div className="w-full h-6 bg-white/10 rounded"/>
                        </div>
                        <div className="flex-1 bg-white/5 rounded-t p-1 space-y-1">
                             <div className="w-full h-1 bg-green-500/50 rounded mb-1"/>
                             <div className="w-full h-6 bg-white/10 rounded"/>
                             <div className="w-full h-6 bg-white/10 rounded"/>
                        </div>
                    </div>

                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: step === 8 ? 1 : 0.8, opacity: step === 8 ? 1 : 0 }}
                        transition={{ delay: 0.2 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] px-3 py-1 rounded-full font-bold shadow-lg whitespace-nowrap"
                    >
                        Sincronização Concluída
                    </motion.div>

                  </motion.div>

                </div>

                {/* Base do Notebook (Visual) */}
                <div className="h-6 bg-[#252525] border-t border-white/10 flex items-center justify-center relative z-20">
                   <div className="w-16 h-1 bg-white/10 rounded-full" />
                </div>
              </motion.div>
              
              {/* Pés do Monitor (Simulado) */}
              <motion.div 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] z-0 rounded-b-lg border-x border-b border-white/5 flex items-end justify-center"
              >
                 <div className="w-40 h-1.5 bg-[#252525] rounded-full border border-white/10 absolute -bottom-1 left-1/2 -translate-x-1/2 shadow-2xl" />
              </motion.div>

              {/* CELULAR */}
              <motion.div 
                className="absolute bottom-[-100px] right-[-20px] w-[140px] h-[280px] bg-black border-4 border-gray-800 rounded-[2rem] shadow-2xl overflow-hidden z-20 flex flex-col"
                initial={{ y: 200, opacity: 0 }}
                animate={{ 
                  y: step >= 5 && step < 8 ? -50 : 200, 
                  opacity: step >= 5 && step < 8 ? 1 : 0,
                  rotate: -10 
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {/* Tela do Celular (Câmera) */}
                <div className="flex-1 bg-gray-900 relative overflow-hidden">
                   {/* Camera Feed Simulado - gradiente simulando ambiente de escritório */}
                   <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
                   
                   {/* Viewfinder */}
                   <div className="absolute inset-4 border-2 border-white/50 rounded-lg flex items-center justify-center z-10">
                      <div className="w-full h-[1px] bg-white/20" />
                      <div className="h-full w-[1px] bg-white/20 absolute" />
                      
                      {/* Scanning Line */}
                      {step === 6 && (
                        <motion.div 
                          className="absolute w-full h-[2px] bg-green-500 shadow-[0_0_10px_#22c55e]"
                          animate={{ top: ['0%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                   </div>
                   
                   {/* Overlay Instructions */}
                   <div className="absolute bottom-8 left-0 right-0 text-center z-20">
                      <p className="text-[10px] text-white/70 bg-black/50 px-2 py-1 rounded-full inline-block">
                        Aponte para o código QR
                      </p>
                   </div>

                   {/* Success Message on Phone */}
                   <motion.div 
                      className="absolute inset-0 bg-green-600 flex flex-col items-center justify-center text-white z-30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: step >= 7 ? 1 : 0 }}
                   >
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2">
                        <Check className="w-6 h-6 text-green-600" />
                      </div>
                      <span className="text-sm font-bold">Conectado!</span>
                   </motion.div>
                </div>

                {/* Home Indicator */}
                <div className="h-4 bg-black w-full flex justify-center items-center">
                   <div className="w-12 h-1 bg-gray-700 rounded-full" />
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
