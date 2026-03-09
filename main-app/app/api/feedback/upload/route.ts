import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || ''
    // Accept JSON body with optional base64 file payload: { name, email, fileName, fileBase64 }
    if (contentType.includes('application/json')) {
      const body = await request.json()
      const repoRoot = path.resolve('.')
      const uploadsDir = path.join(repoRoot, 'backend', 'uploads', 'feedback')
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

      if (body.fileName && body.fileBase64) {
        // strip data: prefix if present
        const b64 = body.fileBase64.replace(/^data:.*;base64,/, '')
        const buffer = Buffer.from(b64, 'base64')
        const target = path.join(uploadsDir, `${Date.now()}-${body.fileName}`)
        fs.writeFileSync(target, buffer)
        return NextResponse.json({ ok: true, path: `/backend/uploads/feedback/${path.basename(target)}` })
      }

      return NextResponse.json({ ok: false, error: 'no file provided' }, { status: 400 })
    }

    return NextResponse.json({ ok: false, error: 'unsupported content type' }, { status: 415 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 })
  }
}
