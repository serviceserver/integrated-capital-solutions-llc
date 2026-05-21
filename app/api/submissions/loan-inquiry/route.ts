// app/api/submissions/loan-inquiry/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { loanInquirySchema } from '@/lib/validations'
import { sendLoanInquiryNotification } from '@/lib/mail'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = loanInquirySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      )
    }

    const data = parsed.data

    const record = await prisma.loanInquiry.create({
      data: {
        firstName:       data.firstName,
        lastName:        data.lastName,
        email:           data.email,
        phone:           data.phone,
        loanType:        data.loanType,
        propertyAddress: data.propertyAddress,
        loanAmount:      data.loanAmount,
        experience:      data.experience,
        notes:           data.notes,
      },
    })

    // Fire-and-forget email — don't block the response
    sendLoanInquiryNotification(data).catch(console.error)

    return NextResponse.json({ success: true, id: record.id }, { status: 201 })
  } catch (err) {
    console.error('[loan-inquiry] POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  // Protected — used by admin dashboard via server components
  const { searchParams } = new URL(req.url)
  const page   = Math.max(1, Number(searchParams.get('page')  ?? 1))
  const limit  = Math.min(50, Number(searchParams.get('limit') ?? 20))
  const status = searchParams.get('status') ?? undefined

  const where = status ? { status: status as any } : {}

  const [records, total] = await Promise.all([
    prisma.loanInquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.loanInquiry.count({ where }),
  ])

  return NextResponse.json({ records, total, page, limit })
}