import fs from 'fs'
import path from 'path'

export default function AssetsPage() {
  const publicDir = path.join(process.cwd(), 'public', 'company', 'exported-assets')
  let entries: string[] = []
  try {
    const items = fs.readdirSync(publicDir, { withFileTypes: true })
    entries = items.map(i => i.name)
  } catch (e) {}

  return (
    <div style={{ padding: 20 }}>
      <h2>Exported Assets</h2>
      <p>Available files in the imported assets package:</p>
      <ul>
        {entries.map(e => (
          <li key={e}><a href={`/company/exported-assets/${e}`} target="_blank" rel="noreferrer">{e}</a></li>
        ))}
      </ul>
    </div>
  )
}
