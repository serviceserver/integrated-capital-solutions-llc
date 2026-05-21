// app/api/submissions/broker/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { brokerRegistrationSchema } from '@/lib/validations'
import { sendBrokerRegistrationNotification } from '@/lib/mail'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = brokerRegistrationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      )
    }

    const data = parsed.data

    const record = await prisma.brokerRegistration.create({
      data: {
        firstName:    data.firstName,
        lastName:     data.lastName,
        email:        data.email,
        phone:        data.phone,
        company:      data.company,
        nmlsId:       data.nmlsId,
        states:       data.states,
        monthlyVolume: data.monthlyVolume,
        products:     data.products,
        notes:        data.notes,
      },
    })

    sendBrokerRegistrationNotification(data).catch(console.error)

    return NextResponse.json({ success: true, id: record.id }, { status: 201 })
  } catch (err) {
    console.error('[broker] POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}