import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const repoRoot = path.resolve('.')
    const outPath = path.join(repoRoot, 'backend', 'feedback_submissions.json')

    let existing: any[] = []
    try {
      if (fs.existsSync(outPath)) {
        const raw = fs.readFileSync(outPath, 'utf8')
        existing = JSON.parse(raw || '[]')
      }
    } catch (e) {
      // ignore
    }

    existing.push(body)
    fs.writeFileSync(outPath, JSON.stringify(existing, null, 2), 'utf8')

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 })
  }
}
