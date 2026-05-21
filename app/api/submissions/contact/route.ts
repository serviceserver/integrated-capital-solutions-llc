// app/api/submissions/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { contactSchema } from '@/lib/validations'
import { sendContactNotification } from '@/lib/mail'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      )
    }

    const data = parsed.data

    const record = await prisma.contactSubmission.create({
      data: {
        firstName: data.firstName,
        lastName:  data.lastName,
        company:   data.company,
        phone:     data.phone,
        email:     data.email,
        message:   data.message,
      },
    })

    sendContactNotification(data).catch(console.error)

    return NextResponse.json({ success: true, id: record.id }, { status: 201 })
  } catch (err) {
    console.error('[contact] POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

