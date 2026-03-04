'use client'

import { useState, useEffect, useRef } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult, DraggableStyle } from '@hello-pangea/dnd'
import { GripVertical } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

// Tipos
type Card = {
  id: string
  name: string
  type: string
  time: string
  isAuto?: boolean
}

type Column = {
  id: string
  title: string
  color: string
  cards: Card[]
}

const COLUMN_ORDER = ['recepcao', 'qualificado', 'contrato', 'fechado'] as const

const initialData: Record<string, Column> = {
  recepcao: {
    id: 'recepcao',
    title: 'Recepção',
    color: 'text-slate-300',
    cards: [
      { id: 'c1', name: 'João Silva', type: 'Trabalhista', time: '2m' },
      { id: 'c2', name: 'Maria Costa', type: 'Família', time: '5m' },
    ]
  },
  qualificado: {
    id: 'qualificado',
    title: 'Qualificado',
    color: 'text-adv-gold',
    cards: [
      { id: 'c3', name: 'Pedro Santos', type: 'Previdenciário', time: '1h', isAuto: true },
    ]
  },
  contrato: {
    id: 'contrato',
    title: 'Contrato',
    color: 'text-blue-400',
    cards: [
      { id: 'c4', name: 'Lucas Lima', type: 'Cível', time: '2h' },
    ]
  },
  fechado: {
    id: 'fechado',
    title: 'Fechado',
    color: 'text-green-500',
    cards: [
      { id: 'c5', name: 'Ana Oliveira', type: 'Cível', time: '3h', isAuto: true },
    ]
  }
}

const newLeads = [
  { name: 'Carlos Eduardo', type: 'Trabalhista' },
  { name: 'Fernanda Souza', type: 'Família' },
  { name: 'Roberto Dias', type: 'Previdenciário' },
  { name: 'Juliana Paes', type: 'Cível' },
  { name: 'Marcos Vinicius', type: 'Trabalhista' }
]

const getStyle = (style: DraggableStyle | undefined, snapshot: any) => {
  if (!snapshot.isDragging) return style;
  return {
    ...style,
    zIndex: 9999,
    width: 250,
    opacity: 1,
    cursor: 'grabbing',
    margin: 0,
  };
}

export default function InteractiveKanban() {
  const [columns, setColumns] = useState(initialData)
  const [isClient, setIsClient] = useState(false)
  const leadCounter = useRef(0)
  const [draggingColumnId, setDraggingColumnId] = useState<string | null>(null)

  // Card em transição (voando de uma coluna para outra)
  const [flyingCard, setFlyingCard] = useState<{
    card: Card
    fromCol: string
    toCol: string
    fromRect: DOMRect
    toRect: DOMRect
    fast?: boolean
  } | null>(null)
  const columnRefs = useRef<Record<string, HTMLDivElement | null>>({
    recepcao: null, qualificado: null, contrato: null, fechado: null
  })
  const [isResetting, setIsResetting] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const isResettingRef = useRef(false)
  const resetQueueRef = useRef<{ card: Card; fromCol: string; toCol: string }[]>([])

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Inicia animação de voo do card (chamado após capturar posições)
  const startFlyingAnimation = (card: Card, fromColId: string, toColId: string) => {
    const fromEl = columnRefs.current[fromColId]
    const toEl = columnRefs.current[toColId]
    if (!fromEl || !toEl) {
      // Fallback: move direto sem animação
      setColumns(prev => {
        const newCols = JSON.parse(JSON.stringify(prev))
        const idx = newCols[fromColId].cards.findIndex((c: Card) => c.id === card.id)
        if (idx < 0) return prev
        const [moved] = newCols[fromColId].cards.splice(idx, 1)
        moved.isAuto = true
        moved.time = 'Agora'
        newCols[toColId].cards.unshift(moved)
        return newCols
      })
      return
    }
    const fromRect = fromEl.getBoundingClientRect()
    const toRect = toEl.getBoundingClientRect()
    setFlyingCard({ card, fromCol: fromColId, toCol: toColId, fromRect, toRect, fast: isResettingRef.current })
    setColumns(prev => {
      const newCols = JSON.parse(JSON.stringify(prev))
      const idx = newCols[fromColId].cards.findIndex((c: Card) => c.id === card.id)
      if (idx >= 0) newCols[fromColId].cards.splice(idx, 1)
      return newCols
    })
  }

  const processNextResetMove = () => {
    if (resetQueueRef.current.length === 0) {
      setColumns(JSON.parse(JSON.stringify(initialData)))
      leadCounter.current = 0
      isResettingRef.current = false
      setIsResetting(false)
      setResetKey(k => k + 1)
      return
    }
    const next = resetQueueRef.current.shift()!
    setTimeout(() => startFlyingAnimation({ ...next.card }, next.fromCol, next.toCol), 50)
  }

  const finishFlyingAnimation = () => {
    if (!flyingCard) return
    const { card, toCol } = flyingCard
    const moved = { ...card, isAuto: !isResettingRef.current, time: isResettingRef.current ? '2m' : 'Agora' }
    setColumns(prev => {
      const newCols = JSON.parse(JSON.stringify(prev))
      newCols[toCol].cards.unshift(moved)
      return newCols
    })
    setFlyingCard(null)

    if (isResettingRef.current) {
      setTimeout(processNextResetMove, 40)
    }
  }

  // Lógica unificada: cria leads, move com animação suave
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (draggingColumnId || flyingCard || isResetting) return

      setColumns(prev => {
        const newCols = JSON.parse(JSON.stringify(prev))

        // 0. RESET: quando fechado atinge 5 cards, inicia animação de retorno
        if (newCols.fechado.cards.length >= 5) {
          isResettingRef.current = true
          setIsResetting(true)
          resetQueueRef.current = []

          // Constrói fila de movimentos reversos: fechado→contrato→qualificado→recepcao
          const buildReverseMoves = (cols: Record<string, Column>) => {
            const queue: { card: Card; fromCol: string; toCol: string }[] = []
            const colsCopy = JSON.parse(JSON.stringify(cols))

            // Move cards de fechado para contrato até sobrar 1
            while (colsCopy.fechado.cards.length > 1) {
              const card = colsCopy.fechado.cards.shift()
              if (card) queue.push({ card, fromCol: 'fechado', toCol: 'contrato' })
            }
            // Move cards de contrato para qualificado até sobrar 1
            while (colsCopy.contrato.cards.length > 1) {
              const card = colsCopy.contrato.cards.shift()
              if (card) queue.push({ card, fromCol: 'contrato', toCol: 'qualificado' })
            }
            // Move cards de qualificado para recepcao até sobrar 1
            while (colsCopy.qualificado.cards.length > 1) {
              const card = colsCopy.qualificado.cards.shift()
              if (card) queue.push({ card, fromCol: 'qualificado', toCol: 'recepcao' })
            }
            return queue
          }

          resetQueueRef.current = buildReverseMoves(newCols)
          setTimeout(() => processNextResetMove(), 100)
          return prev
        }

        // 1. Cria novo lead na recepção se vazio
        if (newCols.recepcao.cards.length === 0) {
          const nextLead = newLeads[leadCounter.current % newLeads.length]
          leadCounter.current += 1
          newCols.recepcao.cards.push({
            id: `new-${Date.now()}`,
            name: nextLead.name,
            type: nextLead.type,
            time: 'Novo',
            isAuto: false
          })
          return newCols
        }

        // 2. Encontra próximo movimento (prioridade: contrato→fechado, qualificado→contrato, recepcao→qualificado)
        for (let i = COLUMN_ORDER.length - 2; i >= 0; i--) {
          const fromColId = COLUMN_ORDER[i]
          const toColId = COLUMN_ORDER[i + 1]
          const fromCol = newCols[fromColId]
          if (fromCol.cards.length > 0) {
            const cardIndex = fromColId === 'recepcao'
              ? (() => { const idx = fromCol.cards.findIndex((c: Card) => c.time !== 'Novo'); return idx >= 0 ? idx : 0 })()
              : 0
            const card = fromCol.cards[cardIndex]
            if (card) {
              setTimeout(() => startFlyingAnimation({ ...card }, fromColId, toColId), 100)
              return prev
            }
          }
        }
        return prev
      })
    }, 4500)
    return () => clearInterval(moveInterval)
  }, [draggingColumnId, flyingCard, isResetting])

  const onDragStart = (start: any) => {
    setDraggingColumnId(start.source.droppableId)
  }

  const onDragEnd = (result: DropResult) => {
    setDraggingColumnId(null)
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const sourceCol = columns[source.droppableId]
    const destCol = columns[destination.droppableId]
    const sourceCards = [...sourceCol.cards]
    const destCards = [...destCol.cards]
    const [removed] = sourceCards.splice(source.index, 1)
    removed.isAuto = false

    if (source.droppableId === destination.droppableId) {
      sourceCards.splice(destination.index, 0, removed)
      setColumns({ ...columns, [source.droppableId]: { ...sourceCol, cards: sourceCards } })
    } else {
      destCards.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, cards: sourceCards },
        [destination.droppableId]: { ...destCol, cards: destCards }
      })
    }
  }

  if (!isClient) return null

  const CardContent = ({ card, snapshot, isHighlight }: { card: Card; snapshot: any; isHighlight?: boolean }) => (
    <div className={`bg-[#141414] p-4 rounded-xl border transition-all duration-300 relative group/card
      ${snapshot?.isDragging 
        ? 'border-adv-gold shadow-2xl shadow-adv-gold/30 scale-105' 
        : isHighlight || card.isAuto
          ? 'border-adv-gold bg-adv-gold/10 shadow-lg shadow-adv-gold/20'
          : 'border-white/5 hover:border-adv-gold/50 hover:shadow-[0_0_24px_rgba(255,184,77,0.15)] hover:scale-[1.02]'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-white font-medium text-sm truncate">{card.name}</span>
        <GripVertical className="w-4 h-4 text-slate-700" />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-slate-400 border border-white/5">{card.type}</span>
        <div className="flex items-center gap-2">
          {card.isAuto && (
            <span className={`text-[9px] flex items-center gap-1 font-bold px-2 py-0.5 rounded
              ${draggingColumnId ? 'text-gray-400' : 'text-black bg-adv-gold'}`}>
              <Logo className="h-2.5 w-auto opacity-90" />
              Classificado pela IA
            </span>
          )}
          <span className="text-[10px] text-slate-600">{card.time}</span>
        </div>
      </div>
    </div>
  )

  return (
    <section className="py-32 bg-transparent border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-adv-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-adv-gold text-xs font-bold tracking-widest uppercase mb-4 block">
            Gestão Visual Completa
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Kanban <span className="text-adv-gold">Inteligente</span>
          </h2>
          <p className="text-slate-400 mt-4">
            Gerencie todo o ciclo de vida do cliente em um só lugar.
          </p>
        </div>

        {/* Card em voo - animação de transição entre colunas */}
        <AnimatePresence>
          {flyingCard && (
            <motion.div
              className="fixed left-0 top-0 z-[9998] pointer-events-none"
              initial={{
                x: flyingCard.fromRect.left + flyingCard.fromRect.width / 2 - 125,
                y: flyingCard.fromRect.top + 60,
                opacity: 1,
                scale: 1
              }}
              animate={{
                x: flyingCard.toRect.left + flyingCard.toRect.width / 2 - 125,
                y: flyingCard.toRect.top + 60,
                opacity: 1,
                scale: 1
              }}
              transition={{ duration: flyingCard.fast ? 0.25 : 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              onAnimationComplete={finishFlyingAnimation}
              style={{ width: 250 }}
            >
              <div className="border-2 border-adv-gold bg-adv-gold/20 shadow-2xl shadow-adv-gold/40 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-white font-medium text-sm truncate">{flyingCard.card.name}</span>
                  <Logo className="h-3 w-auto opacity-80" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] px-2 py-1 rounded bg-white/10 text-slate-300">{flyingCard.card.type}</span>
                  <span className="text-[9px] flex items-center gap-1 font-bold text-black bg-adv-gold px-2 py-0.5 rounded">
                    Classificado pela IA
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <motion.div 
            key={resetKey}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
          >
            {Object.values(columns).map(col => (
              <div
                key={col.id}
                ref={el => { columnRefs.current[col.id] = el }}
                className={`bg-[#0F0F0F] border border-white/5 rounded-2xl p-4 min-h-[400px] flex flex-col transition-all duration-200 overflow-visible shadow-[0_0_30px_rgba(255,184,77,0.06)]
                  ${draggingColumnId === col.id ? 'z-50 relative ring-1 ring-adv-gold/20' : 'z-0 relative'}
                `}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${col.id === 'recepcao' ? 'bg-slate-500' : col.id === 'qualificado' ? 'bg-adv-gold' : col.id === 'contrato' ? 'bg-blue-400' : 'bg-green-500'}`} />
                    <h3 className={`font-medium ${col.color}`}>{col.title}</h3>
                  </div>
                  <span className="text-xs text-slate-600 bg-white/5 px-2 py-1 rounded">{col.cards.length}</span>
                </div>

                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex-1 space-y-3 transition-colors rounded-xl ${snapshot.isDraggingOver ? 'bg-white/5' : ''}`}
                    >
                      {col.cards.map((card, index) => (
                        <Draggable key={card.id} draggableId={card.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getStyle(provided.draggableProps.style, snapshot)}
                            >
                              <CardContent card={card} snapshot={snapshot} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </motion.div>
        </DragDropContext>
      </div>
    </section>
  )
}
