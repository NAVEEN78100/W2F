import fs from 'fs'
import path from 'path'
import PartnersFooter from './footer'

export default function PartnersReactPage() {
  const publicDir = path.join(process.cwd(), 'public', 'company', 'partners-react')
  let htmlFiles: string[] = []
  let entryFile = 'index.html'
  try {
    const all = fs.readdirSync(publicDir, { withFileTypes: true })
    htmlFiles = all.filter(d => d.isFile() && d.name.toLowerCase().endsWith('.html')).map(d => d.name)
    if (htmlFiles.length > 0) {
      const hasIndex = htmlFiles.find(name => name.toLowerCase() === 'index.html')
      entryFile = hasIndex || htmlFiles[0]
    }
  } catch (e) {}

  const partnersContent = htmlFiles.length > 0 ? (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe title="Partners React" src={`/company/partners-react/${entryFile}`} style={{ width: '100%', height: '100%', border: 'none' }} />
    </div>
  ) : (
    <div style={{ padding: 20 }}>
      <h2>Partners (React import)</h2>
      <p>No HTML entry found; available files:</p>
      <ul>
        {htmlFiles.length === 0 ? (
          <p><i>(no files detected)</i></p>
        ) : (
          htmlFiles.map(e => (
            <li key={e}><a href={`/company/partners-react/${e}`} target="_blank" rel="noreferrer">{e}</a></li>
          ))
        )}
      </ul>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* Partners Content */}
      <div className="flex-grow">
        {partnersContent}
      </div>

      {/* Footer Component */}
      <PartnersFooter />
    </div>
  )
}
