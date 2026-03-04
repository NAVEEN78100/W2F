import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'

type PartnerOtpRecord = {
  email: string
  otp: string
  expires: number
  verified: boolean
  createdAt: number
}

function readPartnerOtps(filePath: string): PartnerOtpRecord[] {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]')
  } catch {
    return []
  }
}

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const obj: Record<string, any> = {}
    form.forEach((v, k) => {
      if (obj[k]) {
        if (!Array.isArray(obj[k])) obj[k] = [obj[k]]
        obj[k].push(v)
      } else obj[k] = v
    })

    const email = String(obj.Email || obj.email || '').trim().toLowerCase()
    if (!email) {
      return NextResponse.json({ ok: false, error: 'Email is required.' }, { status: 400 })
    }

    const otpFile = path.join(process.cwd(), 'backend', 'partners_otps.json')
    const otpRecords = readPartnerOtps(otpFile)
    const verifiedRecord = otpRecords.find((entry) => entry.email === email && entry.verified && entry.expires > Date.now())

    if (!verifiedRecord) {
      return NextResponse.json({ ok: false, error: 'Please verify OTP before submitting.' }, { status: 400 })
    }

    const outDir = path.join(process.cwd(), 'backend')
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir)
    const outFile = path.join(outDir, 'partners_leads.json')

    let existing: any[] = []
    try { existing = JSON.parse(fs.readFileSync(outFile, 'utf8')) } catch (e) { existing = [] }
    existing.push({ receivedAt: new Date().toISOString(), data: obj })
    fs.writeFileSync(outFile, JSON.stringify(existing, null, 2), 'utf8')

    const remainingOtps = otpRecords.filter((entry) => entry.email !== email)
    fs.writeFileSync(otpFile, JSON.stringify(remainingOtps, null, 2), 'utf8')

    return NextResponse.json({ ok: true, message: 'Lead saved (dev sink)' })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
