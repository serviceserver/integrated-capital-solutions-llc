// app/api/submissions/careers/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { jobApplicationSchema } from '@/lib/validations'
import { sendJobApplicationNotification } from '@/lib/mail'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = jobApplicationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      )
    }

    const data = parsed.data

    const record = await prisma.jobApplication.create({
      data: {
        firstName: data.firstName,
        lastName:  data.lastName,
        email:     data.email,
        phone:     data.phone,
        position:  data.position,
        aboutText: data.aboutText,
        resumeUrl: data.resumeUrl,
        resumeName: data.resumeName,
      },
    })

    sendJobApplicationNotification(data).catch(console.error)

    return NextResponse.json({ success: true, id: record.id }, { status: 201 })
  } catch (err) {
    console.error('[careers] POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}