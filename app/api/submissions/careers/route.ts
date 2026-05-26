// app/api/submissions/careers/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { jobApplicationSchema } from '@/lib/validations'
import { sendJobApplicationNotification } from '@/lib/mail'
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Extract fields from formData
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string | null;
    const position = formData.get('position') as string;
    const aboutText = formData.get('aboutText') as string | null;
    
    // Handle file upload
    let resumeUrl: string | undefined;
    let resumeName: string | undefined;
    
    const resumeFile = formData.get('resume') as File | null;
    if (resumeFile) {
      // Validate file type (optional)
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(resumeFile.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Only PDF, DOC, and DOCX are allowed.' },
          { status: 400 }
        );
      }
      
      // Validate file size (e.g., 5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (resumeFile.size > maxSize) {
        return NextResponse.json(
          { error: 'File size too large. Maximum size is 5MB.' },
          { status: 400 }
        );
      }
      
       // Save file to public/uploads/resumes
       const buffer = Buffer.from(await resumeFile.arrayBuffer());
       // Sanitize filename to prevent path traversal
       const originalName = resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
       const filename = `${Date.now()}-${originalName}`;
       const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'resumes');
       if (!fs.existsSync(uploadDir)) {
         fs.mkdirSync(uploadDir, { recursive: true });
       }
       fs.writeFileSync(path.join(uploadDir, filename), buffer);
       
       resumeUrl = `/uploads/resumes/${filename}`;
       resumeName = resumeFile.name;
    }
    
    // Prepare data for validation
    const data = {
      firstName,
      lastName,
      email,
      phone: phone ?? undefined, // Convert null to undefined for optional field
      position,
      aboutText: aboutText ?? undefined,
      resumeUrl,
      resumeName,
    };
    
    // Validate data
    const parsed = jobApplicationSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }
    
    const validatedData = parsed.data;
    
    // Create job application record
    const record = await prisma.jobApplication.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        position: validatedData.position,
        aboutText: validatedData.aboutText,
        resumeUrl: validatedData.resumeUrl,
        resumeName: validatedData.resumeName,
      },
    });
    
    // Send notification email
    sendJobApplicationNotification(validatedData).catch(console.error);
    
    return NextResponse.json({ success: true, id: record.id }, { status: 201 });
  } catch (err) {
    console.error('[careers] POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}