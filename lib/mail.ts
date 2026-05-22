// lib/mail.ts — email notification helpers for all submission types
import nodemailer from 'nodemailer'

// ─── Transport (lazy-init, shared across calls) ────────────────────────────────
let _transporter: nodemailer.Transporter | null = null
function getTransporter() {
    if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST                    ?? 'smtp.resend.com',
      port:   Number(process.env.SMTP_PORT             ?? '587'),
      secure: (process.env.SMTP_SECURE ?? 'false') === 'true',
      auth: {
        user: process.env.SMTP_USER                    ?? 'resend',
        pass: process.env.SMTP_PASS                    ?? '',
      },
    })
  }
  return _transporter
}

// ─── Generic send helper ───────────────────────────────────────────────────────
async function send(to: string, subject: string, html: string) {
  const transporter = getTransporter()
  return transporter.sendMail({
    from:    process.env.SMTP_FROM!,   // noreply@integratedcapitalsolutionsllc.com
    to,
    subject,
    html,
  })
}

// ─── 1. Loan Inquiry ───────────────────────────────────────────────────────────
export async function sendLoanInquiryNotification(data: {
  firstName: string; lastName: string; email: string
  phone: string; loanType: string; loanAmount: string
  propertyAddress?: string | null; experience?: string | null; notes?: string | null
}) {
  const subject = `New Loan Inquiry – ${data.firstName} ${data.lastName}`

  const to       = process.env.ADMIN_NOTIFY_EMAIL ?? ''
  if (!to) console.warn('[mail] ADMIN_NOTIFY_EMAIL is not set — email will not be sent')

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1a202c;">
      <div style="background: #0a1628; color: #fff; padding: 1.5rem 2rem; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0; font-size: 1.25rem;">New Loan Inquiry</h2>
        <p style="margin: 0.25rem 0 0; font-size: 0.8125rem; opacity: 0.75;">
          Integrated Capital Solutions – Lead Notification
        </p>
      </div>
      <div style="background: #f7f8fa; padding: 1.5rem 2rem; border: 1px solid #e8eaef; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9375rem;">
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; width: 150px; font-weight: 600; font-size: 0.8125rem;">Name</td>
            <td style="padding: 0.5rem 0;">${data.firstName} ${data.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Email</td>
            <td style="padding: 0.5rem 0;"><a href="mailto:${data.email}" style="color: #c8922a; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Phone</td>
            <td style="padding: 0.5rem 0;"><a href="tel:${data.phone}" style="color: #c8922a; text-decoration: none;">${data.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Loan Type</td>
            <td style="padding: 0.5rem 0;"><strong>${data.loanType.replace(/_/g, ' ')}</strong></td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Loan Amount</td>
            <td style="padding: 0.5rem 0;">${data.loanAmount}</td>
          </tr>
          ${data.propertyAddress ? `
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Property Address</td>
            <td style="padding: 0.5rem 0;">${data.propertyAddress}</td>
          </tr>` : ''}
          ${data.experience ? `
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Experience</td>
            <td style="padding: 0.5rem 0;">${data.experience}</td>
          </tr>` : ''}
          ${data.notes ? `
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Notes</td>
            <td style="padding: 0.5rem 0;">${data.notes}</td>
          </tr>` : ''}
        </table>
      </div>
      <p style="text-align: center; color: #9aa3b2; font-size: 0.75rem; margin-top: 1rem;">
        This notification was sent automatically from your website loan inquiry form.
      </p>
    </div>
  `

  return send(to, subject, html)
}

// ─── 2. Broker Registration ────────────────────────────────────────────────────
export async function sendBrokerRegistrationNotification(data: {
  firstName: string; lastName: string; email: string
  phone: string; company: string; nmlsId?: string | null
  states: string; monthlyVolume?: string | null
  products?: string[]; notes?: string | null
}) {
  const subject = `New Broker Registration – ${data.firstName} ${data.lastName}`

  const to       = process.env.ADMIN_NOTIFY_EMAIL ?? ''
  if (!to) console.warn('[mail] ADMIN_NOTIFY_EMAIL is not set — email will not be sent')

  const productsDisplay = Array.isArray(data.products) ? data.products.join(', ') : 'None selected'

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1a202c;">
      <div style="background: #0a1628; color: #fff; padding: 1.5rem 2rem; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0; font-size: 1.25rem;">New Broker Registration</h2>
        <p style="margin: 0.25rem 0 0; font-size: 0.8125rem; opacity: 0.75;">
          Integrated Capital Solutions – Broker Partnership Request
        </p>
      </div>
      <div style="background: #f7f8fa; padding: 1.5rem 2rem; border: 1px solid #e8eaef; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9375rem;">
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; width: 150px; font-weight: 600; font-size: 0.8125rem;">Name</td>
            <td style="padding: 0.5rem 0;">${data.firstName} ${data.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Email</td>
            <td style="padding: 0.5rem 0;"><a href="mailto:${data.email}" style="color: #c8922a; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Phone</td>
            <td style="padding: 0.5rem 0;"><a href="tel:${data.phone}" style="color: #c8922a; text-decoration: none;">${data.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Company</td>
            <td style="padding: 0.5rem 0;"><strong>${data.company}</strong></td>
          </tr>
          ${data.nmlsId ? `
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">NMLS ID</td>
            <td style="padding: 0.5rem 0;">${data.nmlsId}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">States</td>
            <td style="padding: 0.5rem 0;">${data.states}</td>
          </tr>
          ${data.monthlyVolume ? `
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Monthly Volume</td>
            <td style="padding: 0.5rem 0;">${data.monthlyVolume}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Products</td>
            <td style="padding: 0.5rem 0;">${productsDisplay}</td>
          </tr>
          ${data.notes ? `
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Notes</td>
            <td style="padding: 0.5rem 0;">${data.notes}</td>
          </tr>` : ''}
        </table>
      </div>
      <p style="text-align: center; color: #9aa3b2; font-size: 0.75rem; margin-top: 1rem;">
        This notification was sent automatically from your website broker registration form.
      </p>
    </div>
  `

  return send(to, subject, html)
}

// ─── 3. Contact Form ───────────────────────────────────────────────────────────
export async function sendContactNotification(data: {
  firstName: string; lastName: string
  company?: string | null; phone: string; email: string; message: string
}) {
  const subject = `New Contact Submission – ${data.firstName} ${data.lastName}`

  const to       = process.env.ADMIN_NOTIFY_EMAIL ?? ''
  if (!to) console.warn('[mail] ADMIN_NOTIFY_EMAIL is not set — email will not be sent')

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1a202c;">
      <div style="background: #0a1628; color: #fff; padding: 1.5rem 2rem; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0; font-size: 1.25rem;">New Contact Submission</h2>
        <p style="margin: 0.25rem 0 0; font-size: 0.8125rem; opacity: 0.75;">
          Integrated Capital Solutions – Contact Form
        </p>
      </div>
      <div style="background: #f7f8fa; padding: 1.5rem 2rem; border: 1px solid #e8eaef; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9375rem;">
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; width: 150px; font-weight: 600; font-size: 0.8125rem;">Name</td>
            <td style="padding: 0.5rem 0;">${data.firstName} ${data.lastName}</td>
          </tr>
          ${data.company ? `
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Company</td>
            <td style="padding: 0.5rem 0;">${data.company}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Email</td>
            <td style="padding: 0.5rem 0;"><a href="mailto:${data.email}" style="color: #c8922a; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Phone</td>
            <td style="padding: 0.5rem 0;"><a href="tel:${data.phone}" style="color: #c8922a; text-decoration: none;">${data.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem; vertical-align: top;">Message</td>
            <td style="padding: 0.5rem 0; white-space: pre-wrap;">${data.message}</td>
          </tr>
        </table>
      </div>
      <p style="text-align: center; color: #9aa3b2; font-size: 0.75rem; margin-top: 1rem;">
        This notification was sent automatically from your website contact form.
      </p>
    </div>
  `

  return send(to, subject, html)
}

// ─── 4. Job Application ────────────────────────────────────────────────────────
export async function sendJobApplicationNotification(data: {
  firstName: string; lastName: string; email: string
  phone?: string | null; position: string; aboutText?: string | null
  resumeUrl?: string | null; resumeName?: string | null
}) {
  const subject = `New Job Application – ${data.firstName} ${data.lastName} for ${data.position}`

  const to       = process.env.ADMIN_NOTIFY_EMAIL ?? ''
  if (!to) console.warn('[mail] ADMIN_NOTIFY_EMAIL is not set — email will not be sent')

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1a202c;">
      <div style="background: #0a1628; color: #fff; padding: 1.5rem 2rem; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0; font-size: 1.25rem;">New Job Application</h2>
        <p style="margin: 0.25rem 0 0; font-size: 0.8125rem; opacity: 0.75;">
          Integrated Capital Solutions – Careers Portal
        </p>
      </div>
      <div style="background: #f7f8fa; padding: 1.5rem 2rem; border: 1px solid #e8eaef; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9375rem;">
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; width: 150px; font-weight: 600; font-size: 0.8125rem;">Name</td>
            <td style="padding: 0.5rem 0;">${data.firstName} ${data.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Email</td>
            <td style="padding: 0.5rem 0;"><a href="mailto:${data.email}" style="color: #c8922a; text-decoration: none;">${data.email}</a></td>
          </tr>
          ${data.phone ? `
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Phone</td>
            <td style="padding: 0.5rem 0;"><a href="tel:${data.phone}" style="color: #c8922a; text-decoration: none;">${data.phone}</a></td>
          </tr>` : ''}
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Position</td>
            <td style="padding: 0.5rem 0;"><strong>${data.position}</strong></td>
          </tr>
          ${data.aboutText ? `
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem; vertical-align: top;">About</td>
            <td style="padding: 0.5rem 0; white-space: pre-wrap;">${data.aboutText}</td>
          </tr>` : ''}
          ${data.resumeUrl ? `
          <tr>
            <td style="padding: 0.5rem 0; color: #9aa3b2; font-weight: 600; font-size: 0.8125rem;">Resume</td>
            <td style="padding: 0.5rem 0;"><a href="${data.resumeUrl}" style="color: #c8922a; text-decoration: none;">${data.resumeName || data.resumeUrl}</a></td>
          </tr>` : ''}
        </table>
      </div>
      <p style="text-align: center; color: #9aa3b2; font-size: 0.75rem; margin-top: 1rem;">
        This notification was sent automatically from your website careers application form.
      </p>
    </div>
  `

  return send(to, subject, html)
}

