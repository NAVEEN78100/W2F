import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

async function readJson(file: string) {
  try {
    const raw = await fs.readFile(file, 'utf8')
    return JSON.parse(raw || '[]')
  } catch (e) {
    return []
  }
}

async function writeJson(file: string, data: any) {
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, phone, category, message, otp } = body
    const repoRoot = path.resolve('.')

    // OTP validation if provided
    if (otp) {
      const otpFile = path.join(repoRoot, 'backend', 'feedback_otps.json')
      const otps: any[] = await readJson(otpFile)
      const record = otps.find((r) => r.email === email && r.otp === otp && r.expires > Date.now())
      if (!record) return NextResponse.json({ ok: false, error: 'invalid or expired otp' }, { status: 400 })
      // remove used otp
      const remaining = otps.filter((r) => !(r.email === email && r.otp === otp))
      await writeJson(otpFile, remaining)
    }

    const outPath = path.join(repoRoot, 'backend', 'feedback_submissions.json')
    const existing = await readJson(outPath)
    existing.push({ fullName, email, phone, category, message, createdAt: new Date().toISOString() })
    await writeJson(outPath, existing)

    let emailSent = false
    const serviceId = process.env.EMAILJS_SERVICE_ID
    const templateId = process.env.EMAILJS_TEMPLATE_SUBMIT_ID
    const userId = process.env.EMAILJS_USER_ID
    if (serviceId && templateId && userId) {
      try {
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: userId,
            template_params: { fullName, email, phone, category, message }
          })
        })
        emailSent = true
      } catch (e) {
        console.error('EmailJS submit send failed', e)
      }
    }

    return NextResponse.json({ ok: true, emailSent })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 })
  }

  // ensure function closes
}

