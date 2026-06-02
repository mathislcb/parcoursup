import { useState } from 'react'

export default function AddVoeuModal({ tab, onAdd, onClose }) {
  const [form, setForm] = useState({
    formation: '', type: '', lieu: '', notes: '',
    posActuelle: '', posDebut: '', dernierAdmis: ''
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = () => {
    if (!form.formation || !form.lieu) return
    onAdd({
      ...form,
      posActuelle: Number(form.posActuelle),
      posDebut: Number(form.posDebut),
      dernierAdmis: Number(form.dernierAdmis),
    })
  }

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: 10,
    border: '1.5px solid #ffffff22', background: '#ffffff0f',
    color: '#fff', fontSize: 14, outline: 'none', marginBottom: 10
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#000000bb',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 300
    }} onClick={onClose}>
      <div style={{
        background: '#1a1a2e', borderRadius: '24px 24px 0 0',
        padding: 24, width: '100%', maxWidth: 480,
        maxHeight: '85vh', overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ width: 40, height: 4, background: '#ffffff33', borderRadius: 2, margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: 18, fontWeight: 800 }}>
            {tab === 'accepte' ? '🎉 Ajouter un vœu accepté' :
             tab === 'attente' ? '⏳ Ajouter un vœu en attente' : '😔 Ajouter un vœu refusé'}
          </h2>
        </div>

        <input placeholder="Formation (ex: BUT Informatique)" style={inputStyle}
          value={form.formation} onChange={e => set('formation', e.target.value)} />
        <input placeholder="Type (ex: BUT, Licence, BTS...)" style={inputStyle}
          value={form.type} onChange={e => set('type', e.target.value)} />
        <input placeholder="Ville / École" style={inputStyle}
          value={form.lieu} onChange={e => set('lieu', e.target.value)} />
        <input placeholder="Notes (optionnel)" style={inputStyle}
          value={form.notes} onChange={e => set('notes', e.target.value)} />

        {tab === 'attente' && <>
          <div style={{ fontSize: 13, color: '#ffffff66', marginBottom: 8 }}>📊 Liste d'attente</div>
          <input placeholder="Ma position actuelle" type="number" style={inputStyle}
            value={form.posActuelle} onChange={e => set('posActuelle', e.target.value)} />
          <input placeholder="Ma position au début" type="number" style={inputStyle}
            value={form.posDebut} onChange={e => set('posDebut', e.target.value)} />
          <input placeholder="Dernier admis l'an dernier (rang)" type="number" style={inputStyle}
            value={form.dernierAdmis} onChange={e => set('dernierAdmis', e.target.value)} />
        </>}

        <button onClick={handleSubmit} style={{
          width: '100%', padding: '14px', borderRadius: 12,
          background: 'linear-gradient(135deg, #6C63FF, #3ecfcf)',
          border: 'none', color: '#fff', fontSize: 16, fontWeight: 800,
          cursor: 'pointer', marginTop: 4
        }}>Ajouter ce vœu ✨</button>
      </div>
    </div>
  )
}