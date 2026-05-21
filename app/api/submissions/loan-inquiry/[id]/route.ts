// app/api/submissions/loan-inquiry/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { status, assignedTo, internalNotes } = body

  const record = await prisma.loanInquiry.update({
    where: { id },
    data: {
      ...(status        && { status }),
      ...(assignedTo    !== undefined && { assignedTo }),
      ...(internalNotes !== undefined && { internalNotes }),
    },
  })
  return NextResponse.json(record)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.loanInquiry.delete({ where: { id } })
  return NextResponse.json({ success: true })
}