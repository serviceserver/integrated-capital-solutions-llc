import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const record = await prisma.brokerRegistration.update({
    where: { id },
    data: {
      ...(body.status        && { status: body.status }),
      ...(body.assignedTo    !== undefined && { assignedTo: body.assignedTo }),
      ...(body.internalNotes !== undefined && { internalNotes: body.internalNotes }),
    },
  })
  return NextResponse.json(record)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await prisma.brokerRegistration.delete({ where: { id } })
  return NextResponse.json({ success: true })
}