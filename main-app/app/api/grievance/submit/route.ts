import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.fullName || !body.email || !body.phone || !body.state || !body.location) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    // Create grievance record with timestamp
    const grievanceRecord = {
      ...body,
      timestamp: new Date().toISOString(),
      id: `GR-${Date.now()}`
    }

    // Save to backend directory
    const repoRoot = path.resolve('.')
    const grievanceFile = path.join(repoRoot, 'backend', 'grievance_submissions.json')
    
    // Read existing submissions
    let submissions: any[] = []
    try {
      const raw = await fs.readFile(grievanceFile, 'utf8')
      submissions = JSON.parse(raw || '[]')
    } catch (e) {
      submissions = []
    }

    // Add new submission
    submissions.push(grievanceRecord)
    
    // Write back to file
    await fs.mkdir(path.dirname(grievanceFile), { recursive: true })
    await fs.writeFile(grievanceFile, JSON.stringify(submissions, null, 2), 'utf8')

    return NextResponse.json({ ok: true, message: 'Grievance submitted successfully', id: grievanceRecord.id })
  } catch (err) {
    console.error('Grievance submission error:', err)
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 })
  }
}
