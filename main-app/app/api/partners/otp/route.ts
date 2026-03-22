import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import nodemailer from 'nodemailer'

type PartnerOtpRecord = {
  email: string
  otp: string
  expires: number
  verified: boolean
  createdAt: number
  details?: {
    category?: string
    name?: string
    email?: string
    phone?: string
    location?: string
    remarks?: string
  }
}

const OTP_FILE = path.join(process.cwd(), 'backend', 'partners_otps.json')
const LOGO_PATH = path.join(process.cwd(), 'public', '4 (1).png')

async function readOtps(): Promise<PartnerOtpRecord[]> {
  try {
    const raw = await fs.readFile(OTP_FILE, 'utf8')
    return JSON.parse(raw || '[]')
  } catch {
    return []
  }
}

async function writeOtps(data: PartnerOtpRecord[]) {
  await fs.mkdir(path.dirname(OTP_FILE), { recursive: true })
  await fs.writeFile(OTP_FILE, JSON.stringify(data, null, 2), 'utf8')
}

function buildOtpEmailHtml(otp: string, details: PartnerOtpRecord['details']) {
  const safe = (value?: string) => (value || '-').toString().replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const requestedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return `
  <!doctype html>
  <html>
    <body style="margin:0;padding:0;background:#f3f5f8;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">Your Wander With Food OTP is ${otp}. Valid for 5 minutes.</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f3f5f8;padding:24px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;width:100%;background:#ffffff;border:1px solid #f0d24f;border-radius:14px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">
              <tr>
                <td style="background:#ffd402;padding:16px 20px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="font-size:12px;line-height:18px;font-weight:700;letter-spacing:.08em;color:#3d2f00;text-transform:uppercase;">Wander With Food</td>
                      <td align="right" style="width:64px;">
                        <img src="cid:w2f-logo" alt="W2F" width="48" height="48" style="display:block;border:0;border-radius:10px;" />
                      </td>
                    </tr>
                  </table>
                  <div style="font-size:24px;line-height:30px;font-weight:700;color:#121212;margin-top:6px;">Partner OTP Verification</div>
                  <div style="font-size:14px;line-height:20px;color:#3d2f00;margin-top:6px;">Use the code below to verify your partnership request.</div>
                </td>
              </tr>

              <tr>
                <td style="padding:22px 20px 10px 20px;">
                  <div style="font-size:13px;line-height:20px;color:#222222;margin-bottom:8px;">Your one-time password</div>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background:#111111;color:#ffd402;font-size:30px;line-height:34px;font-weight:800;letter-spacing:6px;padding:12px 16px;border-radius:10px;border:2px solid #ffd402;">${otp}</td>
                    </tr>
                  </table>
                  <div style="font-size:13px;line-height:20px;color:#505050;margin-top:10px;">OTP validity: 5 minutes</div>
                </td>
              </tr>

              <tr>
                <td style="padding:8px 20px 20px 20px;">
                  <div style="font-size:16px;line-height:22px;font-weight:700;color:#1f1f1f;margin-bottom:8px;">Submitted Details</div>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;font-size:13px;line-height:19px;color:#242424;">
                    <tr><td style="padding:8px;border:1px solid #ececec;background:#fff9db;font-weight:700;width:36%;">Category</td><td style="padding:8px;border:1px solid #ececec;">${safe(details?.category)}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ececec;background:#fff9db;font-weight:700;">Name</td><td style="padding:8px;border:1px solid #ececec;">${safe(details?.name)}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ececec;background:#fff9db;font-weight:700;">Email</td><td style="padding:8px;border:1px solid #ececec;">${safe(details?.email)}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ececec;background:#fff9db;font-weight:700;">Phone</td><td style="padding:8px;border:1px solid #ececec;">${safe(details?.phone)}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ececec;background:#fff9db;font-weight:700;">Location</td><td style="padding:8px;border:1px solid #ececec;">${safe(details?.location)}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ececec;background:#fff9db;font-weight:700;">Remarks</td><td style="padding:8px;border:1px solid #ececec;">${safe(details?.remarks)}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ececec;background:#fff9db;font-weight:700;">Requested At</td><td style="padding:8px;border:1px solid #ececec;">${safe(requestedAt)}</td></tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="background:#111111;color:#f2f2f2;padding:12px 20px;font-size:12px;line-height:18px;">If you did not request this OTP, please ignore this message.</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `
}

function buildAdminRequestEmailHtml(details: PartnerOtpRecord['details']) {
  const safe = (value?: string) => (value || '-').toString().replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const requestedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return `
  <!doctype html>
  <html>
    <body style="margin:0;padding:0;background:#f3f5f8;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">New partner request details from ${safe(details?.name || details?.email)}.</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f3f5f8;padding:24px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;width:100%;background:#ffffff;border:1px solid #f0d24f;border-radius:14px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">
              <tr>
                <td style="background:#111111;padding:16px 20px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="font-size:12px;line-height:18px;font-weight:700;letter-spacing:.08em;color:#ffd402;text-transform:uppercase;">Wander With Food - Admin</td>
                      <td align="right" style="width:64px;">
                        <img src="cid:w2f-logo" alt="W2F" width="48" height="48" style="display:block;border:0;border-radius:10px;" />
                      </td>
                    </tr>
                  </table>
                  <div style="font-size:22px;line-height:28px;font-weight:700;color:#ffffff;margin-top:6px;">New Partner Request</div>
                  <div style="font-size:14px;line-height:20px;color:#d7d7d7;margin-top:6px;">A user requested OTP verification for partner submission.</div>
                </td>
              </tr>

              <tr>
                <td style="padding:20px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;font-size:13px;line-height:19px;color:#242424;">
                    <tr><td style="padding:8px;border:1px solid #ececec;background:#fff9db;font-weight:700;width:36%;">Category</td><td style="padding:8px;border:1px solid #ececec;">${safe(details?.category)}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ececec;background:#fff9db;font-weight:700;">Name</td><td style="padding:8px;border:1px solid #ececec;">${safe(details?.name)}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ececec;background:#fff9db;font-weight:700;">Email</td><td style="padding:8px;border:1px solid #ececec;">${safe(details?.email)}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ececec;background:#fff9db;font-weight:700;">Phone</td><td style="padding:8px;border:1px solid #ececec;">${safe(details?.phone)}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ececec;background:#fff9db;font-weight:700;">Location</td><td style="padding:8px;border:1px solid #ececec;">${safe(details?.location)}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ececec;background:#fff9db;font-weight:700;">Remarks</td><td style="padding:8px;border:1px solid #ececec;">${safe(details?.remarks)}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ececec;background:#fff9db;font-weight:700;">Requested At</td><td style="padding:8px;border:1px solid #ececec;">${safe(requestedAt)}</td></tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="background:#ffd402;color:#2f2500;padding:12px 20px;font-size:12px;line-height:18px;font-weight:700;">This is an automated admin notification from the W2F partner system.</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `
}

function createTransporter() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER || process.env.EMAIL_USER
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASSWORD

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })
  }

  if (user && pass) {
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: { user, pass },
    })
  }

  return null
}

function getMessageText(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error || '')
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const action = String(body?.action || '').trim().toLowerCase()
    const email = String(body?.email || '').trim().toLowerCase()

    if (!email) {
      return NextResponse.json({ ok: false, error: 'Email is required.' }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const otpRecords = await readOtps()

    if (action === 'verify') {
      const otp = String(body?.otp || '').trim()
      if (!otp) {
        return NextResponse.json({ ok: false, error: 'OTP is required.' }, { status: 400 })
      }

      const record = otpRecords.find((entry) => entry.email === email)
      if (!record || record.expires <= Date.now() || record.otp !== otp) {
        return NextResponse.json({ ok: false, error: 'Invalid or expired OTP.' }, { status: 400 })
      }

      record.verified = true
      await writeOtps(otpRecords)
      return NextResponse.json({ ok: true, message: 'OTP verified successfully.' })
    }

    if (action !== 'send') {
      return NextResponse.json({ ok: false, error: 'Invalid action.' }, { status: 400 })
    }

    const details = {
      category: String(body?.category || ''),
      name: String(body?.name || ''),
      phone: String(body?.phone || ''),
      location: String(body?.location || ''),
      remarks: String(body?.remarks || ''),
      email,
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expires = Date.now() + 5 * 60 * 1000

    const filtered = otpRecords.filter((entry) => entry.email !== email)
    filtered.push({
      email,
      otp,
      expires,
      verified: false,
      createdAt: Date.now(),
      details,
    })
    await writeOtps(filtered)

    const transporter = createTransporter()
    if (!transporter) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Email server is not configured. Set SMTP_USER/SMTP_PASS (or EMAIL_USER/EMAIL_PASSWORD).',
        },
        { status: 500 },
      )
    }

    const fromAddress = process.env.SMTP_FROM || process.env.EMAIL_FROM || process.env.SMTP_USER || process.env.EMAIL_USER
    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || process.env.SMTP_USER || process.env.EMAIL_USER

    try {
      await transporter.sendMail({
        from: fromAddress,
        to: email,
        subject: `W2F Partner OTP: ${otp}`,
        text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
        html: buildOtpEmailHtml(otp, details),
        attachments: [
          {
            filename: 'w2f-logo.png',
            path: LOGO_PATH,
            cid: 'w2f-logo',
          },
        ],
      })
    } catch (mailError) {
      const message = getMessageText(mailError).toLowerCase()
      if (message.includes('address') || message.includes('recipient') || message.includes('mailbox')) {
        return NextResponse.json({ ok: false, error: 'User email address is invalid or cannot receive mail.' }, { status: 400 })
      }
      throw mailError
    }

    if (adminEmail) {
      transporter
        .sendMail({
          from: fromAddress,
          to: adminEmail,
          subject: `New Partner Request: ${details.name || details.email || 'Unknown'}`,
          text:
            `New partner request details:\n` +
            `Category: ${details.category || '-'}\n` +
            `Name: ${details.name || '-'}\n` +
            `Email: ${details.email || '-'}\n` +
            `Phone: ${details.phone || '-'}\n` +
            `Location: ${details.location || '-'}\n` +
            `Remarks: ${details.remarks || '-'}\n`,
          html: buildAdminRequestEmailHtml(details),
          attachments: [
            {
              filename: 'w2f-logo.png',
              path: LOGO_PATH,
              cid: 'w2f-logo',
            },
          ],
        })
        .catch((adminMailError) => {
          console.warn('Admin notification email failed:', getMessageText(adminMailError))
        })
    }

    return NextResponse.json({ ok: true, message: `OTP sent successfully to ${email}.` })
  } catch (error) {
    console.error('Partner OTP API error:', error)
    return NextResponse.json({ ok: false, error: 'Failed to process OTP request.' }, { status: 500 })
  }
}
