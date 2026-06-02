export default function VoeuCard({ voeu, index, tab, onDelete, onMove }) {
  const bg = tab === 'accepte'
    ? 'linear-gradient(135deg, #16a34a22, #22c55e11)'
    : 'linear-gradient(135deg, #dc262622, #ef444411)'
  const border = tab === 'accepte' ? '#22c55e55' : '#ef444455'

  return (
    <div style={{
      background: bg, border: `1.5px solid ${border}`,
      borderRadius: 16, padding: '16px', marginBottom: 12,
      position: 'relative'
    }}>
      <button onClick={() => onDelete(index)} style={{
        position: 'absolute', top: 12, right: 12,
        background: 'none', border: 'none', color: '#ffffff44',
        fontSize: 18, cursor: 'pointer'
      }}>✕</button>

      <div style={{ fontSize: 13, color: '#ffffff66', marginBottom: 4 }}>{voeu.type}</div>
      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
        {voeu.formation} {voeu.renonce && <span style={{ fontSize: 12, color: '#ef4444', background: '#ef444422', borderRadius: 6, padding: '2px 8px', marginLeft: 6 }}>Renoncé</span>}
      </div>
      <div style={{ fontSize: 13, color: '#ffffffaa' }}>📍 {voeu.lieu}</div>
      {voeu.notes && <div style={{ marginTop: 8, fontSize: 12, color: '#ffffff66', fontStyle: 'italic' }}>{voeu.notes}</div>}

      {tab === 'accepte' && !voeu.renonce && (
        <button onClick={() => onMove(index, 'renonce')} style={{
          marginTop: 12, width: '100%', padding: '8px',
          borderRadius: 10, border: '1.5px solid #ef444466',
          background: '#ef444411', color: '#ef4444',
          fontSize: 13, fontWeight: 700, cursor: 'pointer'
        }}>🚫 Renoncer à ce vœu</button>
      )}
    </div>
  )
}