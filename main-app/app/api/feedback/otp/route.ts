import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

type OtpRecord = { email: string; otp: string; expires: number }

async function readOtps(file: string): Promise<OtpRecord[]> {
  try {
    const raw = await fs.readFile(file, 'utf8')
    return JSON.parse(raw || '[]')
  } catch (e) {
    return []
  }
}

async function writeOtps(file: string, data: OtpRecord[]) {
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = (body.email || '').toString().trim()
    if (!email) return NextResponse.json({ ok: false, error: 'email required' }, { status: 400 })

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expires = Date.now() + 5 * 60 * 1000 // 5 minutes

    const repoRoot = path.resolve('.')
    const otpFile = path.join(repoRoot, 'backend', 'feedback_otps.json')
    const otps = await readOtps(otpFile)

    // remove any existing for this email
    const filtered = otps.filter((r) => r.email !== email)
    filtered.push({ email, otp, expires })
    await writeOtps(otpFile, filtered)

    let emailSent = false
    // If EmailJS credentials are present, attempt to send via EmailJS REST
    const serviceId = process.env.EMAILJS_SERVICE_ID
    const templateId = process.env.EMAILJS_TEMPLATE_OTP_ID
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
            template_params: { to_email: email, otp }
          })
        })
        emailSent = true
      } catch (e) {
        console.error('EmailJS OTP send failed', e)
      }
    }

    // Always return OTP in development for testing
    // In production, only return if EMAILJS_FORCE_RETURN_OTP is set
    const isDev = process.env.NODE_ENV !== 'production'
    const forceReturn = isDev || process.env.EMAILJS_FORCE_RETURN_OTP === '1'

    return NextResponse.json({ ok: true, emailSent, otp: forceReturn ? otp : undefined })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 })
  }
}
