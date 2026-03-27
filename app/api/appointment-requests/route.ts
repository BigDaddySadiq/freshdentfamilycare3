import { NextResponse } from 'next/server';

import type { AppointmentRequestRecord } from '@/lib/appointment-form';
import { validateAppointmentRequest } from '@/lib/appointment-form';
import { saveAppointmentRequest } from '@/lib/appointment-store';
import { buildWhatsAppUrl } from '@/lib/lead';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getForwardedIp(headers: Headers) {
  const forwardedFor = headers.get('x-forwarded-for');

  if (!forwardedFor) {
    return null;
  }

  return forwardedFor.split(',')[0]?.trim() || null;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request body.'
      },
      { status: 400 }
    );
  }

  const validation = validateAppointmentRequest(body);

  if (!validation.success || !validation.data) {
    return NextResponse.json(
      {
        success: false,
        message: 'Please correct the highlighted fields and try again.',
        errors: validation.errors ?? {}
      },
      { status: 422 }
    );
  }

  const submissionId = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const whatsappUrl = buildWhatsAppUrl({
    branchId: validation.data.preferredBranch,
    intentKey: validation.data.treatmentInterest,
    source: 'appointment-form',
    patientName: validation.data.fullName,
    phone: validation.data.phoneNumber,
    callbackTime: validation.data.preferredCallbackTime,
    message: validation.data.message
  });

  const record: AppointmentRequestRecord = {
    ...validation.data,
    id: submissionId,
    createdAt,
    status: 'new',
    source: 'website',
    whatsappUrl,
    metadata: {
      ipAddress: getForwardedIp(request.headers),
      userAgent: request.headers.get('user-agent'),
      referer: request.headers.get('referer')
    }
  };

  let saveResult: Awaited<ReturnType<typeof saveAppointmentRequest>>;

  try {
    saveResult = await saveAppointmentRequest(record);
  } catch (error) {
    console.error('Failed to save appointment request', error);

    return NextResponse.json(
      {
        success: false,
        message:
          'We could not save your appointment request right now. Please try again in a moment.'
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    submissionId,
    createdAt,
    whatsappUrl,
    emailDelivered: saveResult.emailDelivered
  });
}
