import { useState, useEffect } from 'react'
import TabBar from './components/TabBar'
import AttentePage from './components/AttentePage'
import VoeuCard from './components/VoeuCard'
import AddVoeuModal from './components/AddVoeuModal'
import './App.css'

export default function App() {
  const [tab, setTab] = useState('attente')
  const [voeux, setVoeux] = useState(() => {
    const saved = localStorage.getItem('parcoursup-voeux')
    return saved ? JSON.parse(saved) : { accepte: [], attente: [], refuse: [] }
  })
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    localStorage.setItem('parcoursup-voeux', JSON.stringify(voeux))
  }, [voeux])

  const addVoeu = (voeu) => {
    setVoeux(prev => ({ ...prev, [tab]: [...prev[tab], voeu] }))
    setShowModal(false)
  }

  const deleteVoeu = (index) => {
    setVoeux(prev => ({
      ...prev,
      [tab]: prev[tab].filter((_, i) => i !== index)
    }))
  }

  const moveVoeu = (index, destination) => {
    const voeu = voeux[tab][index]
    setVoeux(prev => ({
      ...prev,
      [tab]: prev[tab].filter((_, i) => i !== index),
      [destination]: [...prev[destination], { ...voeu, posActuelle: undefined, posDebut: undefined, dernierAdmis: undefined }]
    }))
  }

  const renonceVoeu = (index) => {
    setVoeux(prev => ({
      ...prev,
      accepte: prev.accepte.map((v, i) => i === index ? { ...v, renonce: true } : v)
    }))
  }

  const editVoeu = (index, updated) => {
    setVoeux(prev => ({
      ...prev,
      attente: prev.attente.map((v, i) => i === index ? updated : v)
    }))
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        background: 'linear-gradient(135deg, #6C63FF, #3ecfcf)',
        padding: '24px 20px 16px',
        textAlign: 'center',
        borderRadius: '0 0 24px 24px',
        boxShadow: '0 4px 20px #6C63FF44'
      }}>
        <div style={{ fontSize: 32 }}>🎓</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>Mon Parcoursup</h1>
        <p style={{ opacity: 0.8, fontSize: 13, marginTop: 4 }}>Suis tes vœux en temps réel</p>
      </header>

      <TabBar tab={tab} setTab={setTab} counts={voeux} />

      <main style={{ flex: 1, padding: '16px', overflowY: 'auto', paddingBottom: 100 }}>
        {voeux[tab].length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: 60, opacity: 0.4 }}>
            <div style={{ fontSize: 48 }}>
              {tab === 'accepte' ? '🎉' : tab === 'attente' ? '⏳' : '😔'}
            </div>
            <p style={{ marginTop: 12, fontSize: 15 }}>Aucun vœu ici pour l'instant</p>
          </div>
        ) : (
          voeux[tab].map((v, i) =>
            tab === 'attente'
              ? <AttentePage key={i} voeu={v} index={i} onDelete={deleteVoeu} onMove={moveVoeu} onEdit={editVoeu} />
              : <VoeuCard key={i} voeu={v} index={i} tab={tab} onDelete={deleteVoeu} onMove={renonceVoeu} />
          )
        )}
      </main>

      <button onClick={() => setShowModal(true)} style={{
        position: 'fixed', bottom: 88, right: 24,
        width: 56, height: 56, borderRadius: '50%',
        background: 'linear-gradient(135deg, #6C63FF, #3ecfcf)',
        border: 'none', fontSize: 28, color: '#fff',
        cursor: 'pointer', boxShadow: '0 4px 20px #6C63FF88',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 100
      }}>+</button>

      {showModal && (
        <AddVoeuModal tab={tab} onAdd={addVoeu} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}