'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { QrCode, Check, Wifi, Zap, MessageSquare, TrendingUp, Calendar, Clock, LayoutGrid, User, Hash, Send, Folder, Braces, Settings } from 'lucide-react'
import FloatingPixels from './FloatingPixels'
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
  // 3: QR Code aparece na tela (transição direta, sem loading)
  // 4: Celular sobe para escanear
  // 5: Escaneando (Barra descendo)
  // 6: Conectado (Sucesso)
  // 7: Dashboard (Prévia com métricas animadas)

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
            await new Promise(r => setTimeout(r, 50))
        }
        await new Promise(r => setTimeout(r, 300))

        // Digitando Senha
        setStep(2)
        for (let i = 0; i <= fullPassword.length; i++) {
            setTypedPassword(fullPassword.slice(0, i))
            await new Promise(r => setTimeout(r, 50))
        }
        await new Promise(r => setTimeout(r, 400))
        
        // Transição direta para QR Code (sem loading)
        setStep(3) // QR Code + Speed Lines
        await new Promise(r => setTimeout(r, 1000))
        
        setStep(4) // Celular sobe
        await new Promise(r => setTimeout(r, 1000))
        
        setStep(5) // Escaneando (mais rápido, linha verde passa 1x)
        await new Promise(r => setTimeout(r, 900))
        
        setStep(6) // Sucesso (Conectado)
        await new Promise(r => setTimeout(r, 1500))

        setStep(7) // Dashboard
        await new Promise(r => setTimeout(r, 6000))
      }
    }
    sequence()
  }, [])

  return (
    <section className="pt-12 pb-24 md:pt-16 md:pb-28 bg-adv-black relative overflow-hidden border-t border-white/5">
      {/* Orbes radiais douradas */}
      <div className="absolute top-1/2 left-[-15%] -translate-y-1/2 w-[550px] h-[550px] bg-[#FFB84D]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-[#F3CEA1]/12 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#FFB84D]/8 rounded-full blur-[120px] pointer-events-none" />
      <FloatingPixels />
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
                Sem complexidade ou necessidade de TI. Basta fazer login na plataforma e escanear o QR Code, como no WhatsApp Web.
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
            
            {/* Linhas e raios de velocidade – sempre visíveis */}
            <div className="absolute inset-0 z-0 pointer-events-none">
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
            </div>

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
                    transition={{ duration: 0.2 }}
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

                  {/* Cenário 2: QR Code */}
                  <motion.div 
                    className="absolute inset-0 bg-[#0f0f0f] flex flex-col items-center justify-center"
                    animate={{ opacity: step >= 3 ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        Escaneie para conectar
                        {step >= 3 && step < 6 && <Zap className="w-4 h-4 text-adv-gold animate-pulse" />}
                    </h3>
                    <div className="p-4 bg-white rounded-xl relative overflow-hidden">
                      <QrCode className="w-32 h-32 text-black" />
                      
                      {/* Scanner Line – uma única passada */}
                      {step >= 5 && step < 6 && (
                        <motion.div 
                          className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_10px_#22c55e]"
                          initial={{ top: '0%' }}
                          animate={{ top: '100%' }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                      )}

                      {/* Success Overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-white/90 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: step >= 6 ? 1 : 0 }}
                      >
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                    </div>
                    <p className="text-gray-500 text-xs mt-4">Abra o WhatsApp {'>'} Menu {'>'} Aparelhos conectados</p>
                  </motion.div>

                  {/* Cenário 3: Dashboard detalhado (igual ao print) */}
                  <motion.div 
                    className="absolute inset-0 bg-[#141414] flex overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: step === 7 ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Sidebar esquerda */}
                    <div className="w-8 bg-[#1a1a1a] border-r border-white/5 flex flex-col items-center py-2 gap-1 shrink-0">
                      {[
                        { Icon: MessageSquare },
                        { Icon: LayoutGrid },
                        { Icon: User },
                        { Icon: Hash },
                        { Icon: Send, active: true },
                        { Icon: Folder },
                        { Icon: Braces },
                      ].map(({ Icon, active }, i) => (
                        <motion.div
                          key={i}
                          className={`p-1 rounded ${active ? 'bg-adv-gold/20 text-adv-gold' : 'text-gray-500'}`}
                          initial={{ opacity: 0 }}
                          animate={step === 7 ? { opacity: 1 } : {}}
                          transition={{ delay: 0.05 * i }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </motion.div>
                      ))}
                      <div className="flex-1 min-h-2" />
                      <Settings className="w-3.5 h-3.5 text-gray-500" />
                    </div>

                    {/* Conteúdo principal */}
                    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                      {/* Header */}
                      <div className="h-6 bg-[#1a1a1a] border-b border-white/5 flex items-center justify-between px-2 shrink-0">
                        <span className="text-[9px] text-white/80 font-semibold">DASHBOARD</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                          <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                          <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                        </div>
                      </div>
                      
                      {/* KPIs com subtítulos */}
                      <div className="grid grid-cols-4 gap-1.5 p-1.5 shrink-0">
                        {[
                          { label: 'Total de Chats', value: '53', sub: 'Todos os atendimentos', icon: MessageSquare, greenBorder: false },
                          { label: 'Taxa de Conversão', value: '35.9%', sub: 'Chats convertidos em leads', icon: TrendingUp, greenBorder: true },
                          { label: 'Reuniões Agendadas', value: '18', sub: 'Ativas e completadas', icon: Calendar, greenBorder: false },
                          { label: 'Atendimento 24/7', value: '0.0%', sub: '0 fora do horário', icon: Clock, greenBorder: false },
                        ].map((m, i) => (
                          <motion.div 
                            key={i}
                            className={`bg-[#1e1e1e] rounded-lg p-1.5 border border-white/5 ${m.greenBorder ? 'border-t-green-500/50' : ''}`}
                            initial={{ opacity: 0, y: 4 }}
                            animate={step === 7 ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.06 * i }}
                          >
                            <div className="flex justify-between">
                              <span className="text-[7px] text-gray-400 truncate">{m.label}</span>
                              <m.icon className={`w-3 h-3 shrink-0 ${m.greenBorder ? 'text-green-400' : 'text-gray-500'}`} />
                            </div>
                            <span className={`text-sm font-bold ${m.greenBorder ? 'text-green-400' : 'text-white'} ${m.label.includes('24/7') ? 'animate-pulse' : ''}`}>{m.value}</span>
                            <div className="text-[6px] text-gray-500 truncate">{m.sub}</div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Grid: Evolução Temporal + Donut | Distribuição + Horário */}
                      <div className="flex gap-1.5 px-1.5 flex-1 min-h-0">
                        {/* Evolução Temporal */}
                        <div className="flex-1 bg-[#1e1e1e] rounded-lg p-1.5 border border-white/5 min-w-0 flex flex-col">
                          <div className="flex justify-between items-center mb-1">
                            <div>
                              <div className="text-[8px] font-medium text-white">Evolução Temporal</div>
                              <div className="text-[6px] text-gray-500">Chats e reuniões no período</div>
                            </div>
                            <div className="flex gap-0.5">
                              <span className="px-1 py-0.5 text-[6px] bg-white/10 rounded text-white">7d</span>
                              <span className="px-1 py-0.5 text-[6px] bg-adv-gold/20 rounded text-adv-gold">30d</span>
                              <span className="px-1 py-0.5 text-[6px] text-gray-500">90d</span>
                              <span className="px-1 py-0.5 text-[6px] text-gray-500">1a</span>
                            </div>
                          </div>
                          <div className="flex gap-1 mb-0.5">
                            <span className="text-[6px] text-gray-500">AGRUPAR POR</span>
                            <span className="px-1 text-[6px] bg-white/10 rounded text-white">Dia</span>
                            <span className="px-1 text-[6px] text-gray-500">Semana</span>
                            <span className="px-1 text-[6px] text-gray-500">Mês</span>
                          </div>
                          <div className="h-10 w-full relative flex-1 min-h-[32px]">
                            <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
                              <motion.path d="M0,35 Q25,30 50,22 T100,8" fill="none" stroke="#FFB84D" strokeWidth="2" strokeLinecap="round"
                                initial={{ pathLength: 0 }} animate={step === 7 ? { pathLength: 1 } : {}}
                                transition={{ duration: 1, delay: 0.3 }} />
                              <motion.path d="M0,38 Q25,34 50,28 T100,18" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" opacity={0.8}
                                initial={{ pathLength: 0 }} animate={step === 7 ? { pathLength: 1 } : {}}
                                transition={{ duration: 1, delay: 0.4 }} />
                            </svg>
                          </div>
                          <div className="text-[6px] text-gray-500">12 jan — 10 fev</div>
                        </div>

                        {/* Taxa de Conversão (Donut) */}
                        <div className="w-20 bg-[#1e1e1e] rounded-lg p-1.5 border border-white/5 shrink-0 flex flex-col items-center justify-center">
                          <div className="text-[7px] font-medium text-white">Taxa de Conversão</div>
                          <div className="text-[6px] text-gray-500 mb-1">Performance atual</div>
                          <div className="relative w-12 h-12">
                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#2a2a2a" strokeWidth="4" />
                              <motion.circle cx="18" cy="18" r="14" fill="none" stroke="#FFB84D" strokeWidth="4" strokeLinecap="round"
                                strokeDasharray="88" initial={{ strokeDashoffset: 88 }} animate={step === 7 ? { strokeDashoffset: 55 } : {}}
                                transition={{ duration: 0.8, delay: 0.5 }} />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-[10px] font-bold text-white">35.9%</span>
                              <span className="text-[5px] text-gray-500">conversão</span>
                            </div>
                          </div>
                          <div className="flex gap-1 mt-0.5">
                            <span className="text-[6px] text-green-400 flex items-center gap-0.5">● 7 contratos</span>
                          </div>
                          <span className="text-[6px] text-gray-500">10 qualificados</span>
                        </div>
                      </div>

                      {/* Distribuição por Status + Horário */}
                      <div className="flex gap-1.5 px-1.5 pb-1.5 flex-1 min-h-0">
                        <div className="flex-1 bg-[#1e1e1e] rounded-lg p-1.5 border border-white/5 min-w-0">
                          <div className="text-[8px] font-medium text-white">Distribuição por Status</div>
                          <div className="text-[6px] text-gray-500 mb-1">Chats em cada estágio do funil</div>
                          {[
                            { label: 'Recepção prev', count: '', val: '0.0%', color: 'bg-adv-gold', dot: 'bg-adv-gold' },
                            { label: 'Desqualificado', count: '6', val: '11.3%', color: 'bg-purple-500', dot: 'bg-purple-500' },
                            { label: 'Contrato Assinado', count: '7', val: '13.2%', color: 'bg-adv-gold', dot: 'bg-adv-gold' },
                            { label: 'Humano', count: '9', val: '17.0%', color: 'bg-gray-600', dot: 'bg-gray-500' },
                          ].map((b, i) => (
                            <div key={i} className="flex items-center gap-1 mb-0.5">
                              <div className={`w-1 h-1 rounded-full ${b.dot}`} />
                              <span className="text-[6px] text-gray-400 w-20 truncate">{b.label}</span>
                              {b.count && <span className="text-[6px] text-gray-500">{b.count}</span>}
                              <span className="text-[6px] text-gray-500 ml-auto">{b.val}</span>
                              <div className="flex-1 max-w-12 h-1 bg-white/5 rounded overflow-hidden">
                                <motion.div 
                                  className={`h-full rounded ${b.color}`}
                                  initial={{ width: 0 }} 
                                  animate={step === 7 ? { width: b.val } : { width: 0 }}
                                  transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }} 
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="w-16 bg-[#1e1e1e] rounded-lg p-1.5 border border-white/5 shrink-0 flex flex-col items-center justify-center">
                          <div className="text-[7px] font-medium text-white text-center">Horário de Atendimento</div>
                          <div className="text-[6px] text-gray-500 text-center mb-1">Distribuição comercial</div>
                          <div className="relative w-10 h-10">
                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                              <circle cx="18" cy="18" r="14" fill="none" stroke="#2a2a2a" strokeWidth="4" />
                              <motion.circle cx="18" cy="18" r="14" fill="none" stroke="#FFB84D" strokeWidth="4" strokeLinecap="round"
                                strokeDasharray="88" initial={{ strokeDashoffset: 88 }} animate={step === 7 ? { strokeDashoffset: 10 } : {}}
                                transition={{ duration: 0.8, delay: 0.6 }} />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-[9px] font-bold text-white">53</span>
                              <span className="text-[5px] text-gray-500">total</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sincronização Concluída */}
                      <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: step === 7 ? 1 : 0.95, opacity: step === 7 ? 1 : 0 }}
                        transition={{ delay: 0.5 }}
                        className="mx-1.5 mb-1.5 py-1 bg-green-600 text-white text-[8px] text-center rounded font-semibold"
                      >
                        Sincronização Concluída
                      </motion.div>
                    </div>
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
                  y: step >= 4 && step < 7 ? -50 : 200, 
                  opacity: step >= 4 && step < 7 ? 1 : 0,
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
                      
                      {/* Scanning Line – uma única passada */}
                      {step === 5 && (
                        <motion.div 
                          className="absolute w-full h-[2px] bg-green-500 shadow-[0_0_10px_#22c55e]"
                          initial={{ top: '0%' }}
                          animate={{ top: '100%' }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
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
                      animate={{ opacity: step >= 6 ? 1 : 0 }}
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
