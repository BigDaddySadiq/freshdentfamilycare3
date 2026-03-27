import 'server-only';

import { appendFile, mkdir } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';

import type { AppointmentRequestRecord } from '@/lib/appointment-form';
import { sendAppointmentAlertEmail } from '@/lib/email';

const STORAGE_ENV_KEY = 'FRESHDENT_APPOINTMENT_STORAGE_PATH';

function getStoragePath() {
  if (process.env[STORAGE_ENV_KEY]) {
    return process.env[STORAGE_ENV_KEY] as string;
  }

  if (process.env.VERCEL) {
    return path.join(tmpdir(), 'freshdent-appointment-requests.ndjson');
  }

  return path.join(process.cwd(), 'data', 'appointment-requests.ndjson');
}

async function persistSubmission(record: AppointmentRequestRecord) {
  const storagePath = getStoragePath();
  await mkdir(path.dirname(storagePath), { recursive: true });
  await appendFile(storagePath, `${JSON.stringify(record)}\n`, 'utf8');
}

export async function saveAppointmentRequest(record: AppointmentRequestRecord) {
  await persistSubmission(record);

  try {
    await sendAppointmentAlertEmail(record);
    return {
      emailDelivered: true
    };
  } catch (error) {
    console.warn('Appointment request email alert failed', error);

    return {
      emailDelivered: false
    };
  }
}
