import { useState } from 'react'

export default function AttentePage({ voeu, index, onDelete, onMove, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [pos, setPos] = useState(voeu.posActuelle)

  const { posDebut, dernierAdmis } = voeu
  const posActuelle = editing ? Number(pos) : voeu.posActuelle
  const progression = posDebut - posActuelle
  const ecart = posActuelle - dernierAdmis

  let couleur, label, emoji
  if (ecart <= -10) { couleur = '#22c55e'; label = 'Bonne chance !'; emoji = '🟢' }
  else if (ecart <= 5) { couleur = '#f59e0b'; label = 'Limite...'; emoji = '🟠' }
  else { couleur = '#ef4444'; label = 'Difficile'; emoji = '🔴' }

  const pct = posDebut > 0 ? Math.min(100, Math.round((progression / posDebut) * 100)) : 0

  const saveEdit = () => {
    onEdit(index, { ...voeu, posActuelle: Number(pos) })
    setEditing(false)
  }

  return (
    <div style={{
      border: `2px solid ${couleur}`,
      borderRadius: 16, padding: 16, marginBottom: 12,
      background: `${couleur}11`, position: 'relative'
    }}>
      <button onClick={() => onDelete(index)} style={{
        position: 'absolute', top: 12, right: 12,
        background: 'none', border: 'none', color: '#ffffff44',
        fontSize: 18, cursor: 'pointer'
      }}>✕</button>

      <div style={{ fontSize: 13, color: '#ffffff66' }}>{voeu.type}</div>
      <div style={{ fontSize: 18, fontWeight: 800, margin: '4px 0 8px' }}>{voeu.formation}</div>
      <div style={{ fontSize: 13, color: '#ffffffaa', marginBottom: 12 }}>📍 {voeu.lieu}</div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ textAlign: 'center' }}>
          {editing ? (
            <input
              type="number"
              value={pos}
              onChange={e => setPos(e.target.value)}
              style={{
                width: 64, padding: '4px 8px', borderRadius: 8,
                border: '1.5px solid #6C63FF', background: '#ffffff11',
                color: '#fff', fontSize: 18, fontWeight: 900, textAlign: 'center'
              }}
            />
          ) : (
            <div style={{ fontSize: 22, fontWeight: 900, color: couleur }}>{voeu.posActuelle}</div>
          )}
          <div style={{ fontSize: 10, color: '#ffffff66' }}>Position actuelle</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 900 }}>{posDebut}</div>
          <div style={{ fontSize: 10, color: '#ffffff66' }}>Position initiale</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#6C63FF' }}>{dernierAdmis}</div>
          <div style={{ fontSize: 10, color: '#ffffff66' }}>Dernier admis N-1</div>
        </div>
      </div>

      <div style={{ background: '#ffffff18', borderRadius: 8, height: 8, overflow: 'hidden', marginBottom: 8 }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: `linear-gradient(90deg, ${couleur}, #6C63FF)`,
          borderRadius: 8, transition: 'width 0.5s ease'
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#ffffff66', marginBottom: 12 }}>
        <span>Avancé de {progression} places ({pct}%)</span>
        <span>{emoji} {label}</span>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {editing ? (
          <>
            <button onClick={saveEdit} style={{
              flex: 1, padding: '8px', borderRadius: 10,
              border: '1.5px solid #22c55e66', background: '#22c55e11',
              color: '#22c55e', fontSize: 13, fontWeight: 700, cursor: 'pointer'
            }}>✅ Sauvegarder</button>
            <button onClick={() => { setEditing(false); setPos(voeu.posActuelle) }} style={{
              flex: 1, padding: '8px', borderRadius: 10,
              border: '1.5px solid #ffffff22', background: '#ffffff0a',
              color: '#ffffff88', fontSize: 13, cursor: 'pointer'
            }}>Annuler</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)} style={{
              flex: 1, padding: '8px', borderRadius: 10,
              border: '1.5px solid #6C63FF66', background: '#6C63FF11',
              color: '#6C63FF', fontSize: 13, fontWeight: 700, cursor: 'pointer'
            }}>✏️ Modifier ma position</button>
            <button onClick={() => onMove(index, 'accepte')} style={{
              flex: 1, padding: '8px', borderRadius: 10,
              border: '1.5px solid #22c55e66', background: '#22c55e11',
              color: '#22c55e', fontSize: 13, fontWeight: 700, cursor: 'pointer'
            }}>🎉 Accepté !</button>
          </>
        )}
      </div>
    </div>
  )
}