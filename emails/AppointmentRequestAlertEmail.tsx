import type { AppointmentRequestRecord } from '@/lib/appointment-form';
import { BRANCHES, CONTACT_DETAILS, TREATMENT_INTENTS } from '@/lib/clinic-data';

interface AppointmentRequestAlertEmailProps {
  record: AppointmentRequestRecord;
}

function getBranchLabel(branchId: AppointmentRequestRecord['preferredBranch']) {
  return BRANCHES.find((branch) => branch.id === branchId)?.name ?? branchId;
}

function getTreatmentLabel(intentKey: AppointmentRequestRecord['treatmentInterest']) {
  return (
    TREATMENT_INTENTS.find((intent) => intent.key === intentKey)?.label ??
    intentKey
  );
}

const styles = {
  body: {
    backgroundColor: '#F8F5F0',
    color: '#2C2C2C',
    fontFamily: 'DM Sans, Arial, sans-serif',
    margin: 0,
    padding: '24px'
  },
  wrapper: {
    margin: '0 auto',
    maxWidth: '680px',
    backgroundColor: '#FFFFFF',
    border: '1px solid rgba(13, 27, 62, 0.08)'
  },
  header: {
    backgroundColor: '#0D1B3E',
    color: '#FFFFFF',
    padding: '28px 32px'
  },
  overline: {
    margin: '0 0 10px',
    color: '#C9A96E',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const
  },
  heading: {
    margin: 0,
    fontFamily: 'Georgia, Times New Roman, serif',
    fontSize: '32px',
    lineHeight: 1.1,
    fontWeight: 600
  },
  section: {
    padding: '28px 32px'
  },
  intro: {
    margin: '0 0 20px',
    fontSize: '15px',
    lineHeight: 1.7
  },
  card: {
    border: '1px solid rgba(13, 27, 62, 0.08)',
    marginBottom: '14px'
  },
  cardHeader: {
    backgroundColor: '#F8F5F0',
    borderBottom: '1px solid rgba(13, 27, 62, 0.08)',
    color: '#0D1B3E',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.12em',
    margin: 0,
    padding: '12px 16px',
    textTransform: 'uppercase' as const
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const
  },
  cellLabel: {
    width: '220px',
    padding: '12px 16px',
    borderBottom: '1px solid rgba(13, 27, 62, 0.08)',
    color: '#6B7280',
    fontSize: '13px',
    verticalAlign: 'top' as const
  },
  cellValue: {
    padding: '12px 16px',
    borderBottom: '1px solid rgba(13, 27, 62, 0.08)',
    color: '#2C2C2C',
    fontSize: '14px',
    lineHeight: 1.6
  },
  actionRow: {
    padding: '8px 0 0'
  },
  button: {
    display: 'inline-block',
    padding: '14px 20px',
    backgroundColor: '#00A8A8',
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const
  },
  secondaryButton: {
    display: 'inline-block',
    padding: '14px 20px',
    marginLeft: '12px',
    border: '1px solid rgba(13, 27, 62, 0.16)',
    color: '#0D1B3E',
    textDecoration: 'none',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const
  },
  footer: {
    padding: '0 32px 28px',
    color: '#6B7280',
    fontSize: '12px',
    lineHeight: 1.7
  }
};

export function AppointmentRequestAlertEmail({
  record
}: AppointmentRequestAlertEmailProps) {
  const branchLabel = getBranchLabel(record.preferredBranch);
  const treatmentLabel = getTreatmentLabel(record.treatmentInterest);
  const callHref = `tel:+91${record.phoneNumber.replace(/\D/g, '')}`;
  const attributionEntries = Object.entries(record.attribution ?? {});

  return (
    <html lang="en">
      <body style={styles.body}>
        <div style={styles.wrapper}>
          <div style={styles.header}>
            <p style={styles.overline}>Fresh Dent Family Care</p>
            <h1 style={styles.heading}>New Appointment Request</h1>
          </div>

          <div style={styles.section}>
            <p style={styles.intro}>
              A new website lead has been submitted for Fresh Dent Family Care. Review the
              request details below and continue the conversation on WhatsApp or by phone.
            </p>

            <div style={styles.card}>
              <p style={styles.cardHeader}>Patient Details</p>
              <table style={styles.table}>
                <tbody>
                  <tr>
                    <td style={styles.cellLabel}>Reference ID</td>
                    <td style={styles.cellValue}>{record.id}</td>
                  </tr>
                  <tr>
                    <td style={styles.cellLabel}>Submitted At</td>
                    <td style={styles.cellValue}>{record.createdAt}</td>
                  </tr>
                  <tr>
                    <td style={styles.cellLabel}>Full Name</td>
                    <td style={styles.cellValue}>{record.fullName}</td>
                  </tr>
                  <tr>
                    <td style={styles.cellLabel}>Phone Number</td>
                    <td style={styles.cellValue}>{record.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td style={styles.cellLabel}>Preferred Branch</td>
                    <td style={styles.cellValue}>{branchLabel}</td>
                  </tr>
                  <tr>
                    <td style={styles.cellLabel}>Treatment Interest</td>
                    <td style={styles.cellValue}>{treatmentLabel}</td>
                  </tr>
                  <tr>
                    <td style={styles.cellLabel}>Preferred Callback Time</td>
                    <td style={styles.cellValue}>{record.preferredCallbackTime}</td>
                  </tr>
                  <tr>
                    <td style={styles.cellLabel}>Message</td>
                    <td style={styles.cellValue}>
                      {record.message || 'No extra message was submitted.'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {attributionEntries.length > 0 ? (
              <div style={styles.card}>
                <p style={styles.cardHeader}>Attribution</p>
                <table style={styles.table}>
                  <tbody>
                    {attributionEntries.map(([key, value]) => (
                      <tr key={key}>
                        <td style={styles.cellLabel}>{key}</td>
                        <td style={styles.cellValue}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            <div style={styles.actionRow}>
              <a href={record.whatsappUrl} style={styles.button}>
                Continue on WhatsApp
              </a>
              <a href={callHref} style={styles.secondaryButton}>
                Call Patient
              </a>
            </div>
          </div>

          <div style={styles.footer}>
            <p>
              This alert was sent from the Fresh Dent Family Care website lead form.
              Destination inbox: {CONTACT_DETAILS.email}
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
