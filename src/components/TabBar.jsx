export default function TabBar({ tab, setTab, counts }) {
  const tabs = [
    { key: 'accepte', label: 'Accepté', emoji: '✅', color: '#22c55e' },
    { key: 'attente', label: 'Attente', emoji: '⏳', color: '#f59e0b' },
    { key: 'refuse', label: 'Refusé', emoji: '❌', color: '#ef4444' },
  ]

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 480,
      background: '#1a1a2e', borderTop: '1px solid #ffffff18',
      display: 'flex', zIndex: 200,
      boxShadow: '0 -4px 20px #00000044'
    }}>
      {tabs.map(t => (
        <button key={t.key} onClick={() => setTab(t.key)} style={{
          flex: 1, padding: '10px 0 8px',
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          color: tab === t.key ? t.color : '#ffffff55',
          transition: 'color 0.2s',
          position: 'relative'
        }}>
          {tab === t.key && (
            <div style={{
              position: 'absolute', top: 0, left: '20%', right: '20%',
              height: 3, borderRadius: 2, background: t.color
            }} />
          )}
          <span style={{ fontSize: 22 }}>{t.emoji}</span>
          <span style={{ fontSize: 11, fontWeight: 700 }}>{t.label}</span>
          {counts[t.key].length > 0 && (
            <span style={{
              position: 'absolute', top: 6, right: '22%',
              background: t.color, color: '#fff',
              borderRadius: '50%', width: 16, height: 16,
              fontSize: 10, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>{counts[t.key].length}</span>
          )}
        </button>
      ))}
    </nav>
  )
}