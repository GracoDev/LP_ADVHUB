'use client'

import { useState, useEffect, useRef } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult, DraggableStyle } from '@hello-pangea/dnd'
import { GripVertical } from 'lucide-react'
import { motion } from 'framer-motion'

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

// Função helper para corrigir o estilo durante o drag
const getStyle = (style: DraggableStyle | undefined, snapshot: any) => {
  if (!snapshot.isDragging) return style;
  
  // Quando arrastando, garantimos z-index máximo e largura fixa
  return {
    ...style,
    // NÃO forçar position: fixed aqui, deixar a lib controlar o posicionamento (geralmente via transform)
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

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Simulação IA e Reset (Mantidos igual)
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setColumns(prev => {
        // Se estiver arrastando, pausa a automação para evitar conflitos visuais
        if (draggingColumnId) return prev;
        
        const newCols = JSON.parse(JSON.stringify(prev))
        if (newCols.recepcao.cards.length > 0) {
          const card = newCols.recepcao.cards.shift()
          if (card) {
            card.isAuto = true
            card.time = 'Agora'
            newCols.qualificado.cards.unshift(card)
          }
        } else {
          const nextLead = newLeads[leadCounter.current % newLeads.length]
          leadCounter.current += 1
          const newCard: Card = {
            id: `new-${Date.now()}`,
            name: nextLead.name,
            type: nextLead.type,
            time: 'Novo',
            isAuto: false
          }
          newCols.recepcao.cards.push(newCard)
        }
        return newCols
      })
    }, 3000)
    return () => clearInterval(moveInterval)
  }, [draggingColumnId])

  useEffect(() => {
    const resetInterval = setInterval(() => {
      setColumns(prev => {
        if (draggingColumnId) return prev; // Pausa reset durante drag

        const cleanCols = { ...prev }
        Object.keys(cleanCols).forEach(key => {
          if (cleanCols[key].cards.length > 3) {
            cleanCols[key].cards = cleanCols[key].cards.slice(0, 2)
          }
        })
        return cleanCols
      })
    }, 15000)
    return () => clearInterval(resetInterval)
  }, [draggingColumnId])

  // Simulação IA e Reset
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setColumns(prev => {
        if (draggingColumnId) return prev;
        
        const newCols = JSON.parse(JSON.stringify(prev))
        
        // 1. Cria novo lead na recepção se necessário
        if (newCols.recepcao.cards.length === 0) {
            const nextLead = newLeads[leadCounter.current % newLeads.length]
            leadCounter.current += 1
            const newCard: Card = {
                id: `new-${Date.now()}`,
                name: nextLead.name,
                type: nextLead.type,
                time: 'Novo',
                isAuto: false
            }
            newCols.recepcao.cards.push(newCard)
        }

        // 2. Move de Recepção para Qualificado (Simulação IA)
        if (newCols.recepcao.cards.length > 0) {
          // Pega um card que não acabou de ser criado (opcional, mas evita movimento instantâneo)
          const cardIndex = newCols.recepcao.cards.findIndex((c: Card) => c.time !== 'Novo')
          // Se não tiver antigo, pega o primeiro mesmo
          const indexToMove = cardIndex >= 0 ? cardIndex : 0
          
          const card = newCols.recepcao.cards.splice(indexToMove, 1)[0]
          
          if (card) {
            card.isAuto = true // Marca para destaque
            card.time = 'Agora'
            newCols.qualificado.cards.unshift(card)
          }
        }

        return newCols
      })
    }, 4000) // Intervalo razoável
    return () => clearInterval(moveInterval)
  }, [draggingColumnId])

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

  return (
    // FIX: Removido 'relative' e 'z-index' da section para evitar novo stacking context
    <section className="py-32 bg-transparent border-t border-white/5 relative">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F3CEA1]/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <span className="text-[#F3CEA1] text-xs font-bold tracking-widest uppercase mb-4 block">
            Gestão Visual Completa
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Kanban <span className="text-[#F3CEA1]">Inteligente</span>
          </h2>
          <p className="text-slate-400 mt-4">
            Gerencie todo o ciclo de vida do cliente em um só lugar.
          </p>
        </div>

        {/* Mouse Simulado Removido */}


        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {Object.values(columns).map(col => (
              // FIX: Container da coluna com z-index dinâmico para evitar sobreposição
              <div 
                key={col.id} 
                className={`bg-[#0F0F0F] border border-white/5 rounded-2xl p-4 min-h-[400px] flex flex-col transition-all duration-200 overflow-visible
                  ${draggingColumnId === col.id ? 'z-50 relative ring-1 ring-[#F3CEA1]/20' : 'z-0 relative'}
                `}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${col.id === 'recepcao' ? 'bg-slate-500' : col.id === 'qualificado' ? 'bg-[#F3CEA1]' : col.id === 'contrato' ? 'bg-blue-400' : 'bg-green-500'}`} />
                    <h3 className={`font-medium ${col.color}`}>{col.title}</h3>
                  </div>
                  <span className="text-xs text-slate-600 bg-white/5 px-2 py-1 rounded">{col.cards.length}</span>
                </div>

                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      // FIX: Estilo visual de "drag over" simplificado
                      className={`flex-1 space-y-3 transition-colors rounded-xl ${snapshot.isDraggingOver ? 'bg-white/5' : ''}`}
                    >
                      {col.cards.map((card, index) => (
                        <Draggable key={card.id} draggableId={card.id} index={index}>
                          {(provided, snapshot) => (
                            // Wrapper do card
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getStyle(provided.draggableProps.style, snapshot)}
                            >
                              {/* Conteúdo Visual do Card (separado para não afetar layout do drag) */}
                              <div className={`bg-[#141414] p-4 rounded-xl border transition-all duration-300 relative group/card
                                ${snapshot.isDragging 
                                  ? 'border-[#F3CEA1] shadow-2xl shadow-[#F3CEA1]/30 scale-105' 
                                  : card.isAuto
                                    ? 'border-[#F3CEA1] bg-[#F3CEA1]/10' // Highlight se movido pela IA
                                    : 'border-white/5 hover:border-[#F3CEA1]/50 hover:shadow-[0_0_20px_rgba(243,206,161,0.1)]'
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
                                      <span className={`text-[10px] flex items-center gap-1 font-bold animate-pulse px-2 py-0.5 rounded
                                        ${draggingColumnId ? 'text-gray-400' : 'text-black bg-[#F3CEA1]'}`}>
                                        IA MOVER
                                      </span>
                                    )}
                                    <span className="text-[10px] text-slate-600">{card.time}</span>
                                  </div>
                                </div>
                              </div>
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
          </div>
        </DragDropContext>

      </div>
    </section>
  )
}
