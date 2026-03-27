'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import type { AppointmentRequestPayload } from '@/lib/appointment-form';
import {
  BRANCHES,
  CALLBACK_TIME_OPTIONS,
  CONTACT_COPY,
  FORM_PRIORITY_INTENTS,
  TREATMENT_INTENTS,
  type Branch,
  type TreatmentIntentKey
} from '@/lib/clinic-data';
import { TRACKING_EVENTS, getStoredAttribution, trackEvent } from '@/lib/tracking';

const defaultBranch = BRANCHES[0]?.id ?? 'branch-1';
const defaultIntent = TREATMENT_INTENTS[0]?.key ?? 'general-consultation';
const defaultCallback = CALLBACK_TIME_OPTIONS[0];

interface FormState extends Omit<AppointmentRequestPayload, 'attribution'> {}

const initialState: FormState = {
  fullName: '',
  phoneNumber: '',
  preferredBranch: defaultBranch,
  treatmentInterest: defaultIntent,
  preferredCallbackTime: defaultCallback,
  message: '',
  consent: false
};

export function AppointmentRequestForm() {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllTreatments, setShowAllTreatments] = useState(false);

  const attribution = useMemo(() => getStoredAttribution(), []);

  const updateField = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setFormState((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
    setError(null);

    if (key === 'preferredBranch') {
      trackEvent(TRACKING_EVENTS.branchSelect, {
        source: 'appointment-form',
        branch_id: value as Branch['id']
      });
    }

    if (key === 'treatmentInterest') {
      trackEvent(TRACKING_EVENTS.treatmentSelect, {
        source: 'appointment-form',
        treatment_intent: value as TreatmentIntentKey
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.fullName.trim() || !formState.phoneNumber.trim() || !formState.consent) {
      setError('Please complete the required fields before continuing.');
      return;
    }

    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    const payload: AppointmentRequestPayload = {
      ...formState,
      attribution
    };

    try {
      const response = await fetch('/api/appointment-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as {
        success: boolean;
        message?: string;
        errors?: Partial<Record<keyof FormState, string>>;
        submissionId?: string;
      };

      if (!response.ok || !result.success) {
        setFieldErrors(result.errors ?? {});
        setError(result.message ?? 'We could not submit your request right now.');
        return;
      }

      window.sessionStorage.setItem(
        'freshdent-appointment-request',
        JSON.stringify({
          ...payload,
          submissionId: result.submissionId
        })
      );

      trackEvent(TRACKING_EVENTS.formSubmit, {
        source: 'appointment-form',
        branch_id: formState.preferredBranch,
        treatment_intent: formState.treatmentInterest,
        callback_time: formState.preferredCallbackTime,
        submission_id: result.submissionId,
        cta_label: CONTACT_COPY.form.fields.submitLabel
      });

      setFormState(initialState);
      router.push(
        `/thank-you?branch=${formState.preferredBranch}&treatment=${formState.treatmentInterest}&source=appointment-form&lead=${result.submissionId}`
      );
    } catch {
      setError('We could not submit your request right now. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="space-y-4 border border-gold/20 bg-cream/60 p-4">
        <div className="grid gap-3 border-b border-gold/15 pb-4">
          <p className="font-body text-[0.68rem] font-medium uppercase tracking-[0.18em] text-gold">
            Mobile-friendly booking
          </p>
          <p className="font-body text-sm font-light leading-relaxed text-muted md:hidden">
            Choose treatment, choose branch, and submit in under a minute.
          </p>
          <div className="hidden gap-2 text-sm font-light leading-relaxed text-muted md:grid md:grid-cols-3">
            <p>1. Pick a treatment</p>
            <p>2. Choose a branch</p>
            <p>3. Submit in under a minute</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="font-body text-[0.68rem] font-medium uppercase tracking-[0.18em] text-gold">
              Most requested treatments
            </p>
            <button
              type="button"
              onClick={() => setShowAllTreatments((current) => !current)}
              className="font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-teal"
            >
              {showAllTreatments ? 'Show fewer' : 'More options'}
            </button>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0">
            {(showAllTreatments ? TREATMENT_INTENTS : FORM_PRIORITY_INTENTS).map((intent) => (
              <button
                key={intent.key}
                type="button"
                onClick={() => updateField('treatmentInterest', intent.key)}
                className={`shrink-0 px-3 py-2 font-body text-[0.68rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300 ${
                  formState.treatmentInterest === intent.key
                    ? 'bg-teal text-white'
                    : 'border border-navy/10 bg-white text-navy/75 hover:border-teal hover:text-navy'
                }`}
              >
                {intent.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-body text-[0.68rem] font-medium uppercase tracking-[0.18em] text-gold">
            Choose your branch first
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {BRANCHES.map((branch) => (
              <button
                key={branch.id}
                type="button"
                onClick={() => updateField('preferredBranch', branch.id)}
                className={`px-4 py-3 text-left transition-colors duration-300 ${
                  formState.preferredBranch === branch.id
                    ? 'bg-navy text-white'
                    : 'border border-navy/10 bg-white text-charcoal hover:border-teal'
                }`}
              >
                <span className="block font-body text-[0.68rem] font-medium uppercase tracking-[0.15em] text-gold">
                  {branch.label}
                </span>
                <span className="mt-2 block font-heading text-xl">{branch.name}</span>
                <span className="mt-2 block font-body text-xs font-light leading-relaxed opacity-80">
                  {branch.address}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2 font-body text-sm text-charcoal">
          <span>{CONTACT_COPY.form.fields.nameLabel}</span>
          <input
            name="fullName"
            type="text"
            value={formState.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
            className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 font-body text-sm text-charcoal transition-colors duration-300 focus:border-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/30"
            autoComplete="name"
            placeholder="Your full name…"
            required
          />
          {fieldErrors.fullName ? (
            <span className="font-body text-xs text-red-600">{fieldErrors.fullName}</span>
          ) : null}
        </label>

        <label className="flex flex-col gap-2 font-body text-sm text-charcoal">
          <span>{CONTACT_COPY.form.fields.phoneLabel}</span>
          <input
            name="phoneNumber"
            type="tel"
            value={formState.phoneNumber}
            onChange={(event) => updateField('phoneNumber', event.target.value)}
            className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 font-body text-sm text-charcoal transition-colors duration-300 focus:border-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/30"
            autoComplete="tel"
            inputMode="tel"
            placeholder="Your phone number…"
            required
          />
          {fieldErrors.phoneNumber ? (
            <span className="font-body text-xs text-red-600">{fieldErrors.phoneNumber}</span>
          ) : null}
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="hidden flex-col gap-2 font-body text-sm text-charcoal md:flex">
          <span>{CONTACT_COPY.form.fields.branchLabel}</span>
          <select
            name="preferredBranch"
            value={formState.preferredBranch}
            onChange={(event) => updateField('preferredBranch', event.target.value as Branch['id'])}
            className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 font-body text-sm text-charcoal transition-colors duration-300 focus:border-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/30"
          >
            {BRANCHES.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
          {fieldErrors.preferredBranch ? (
            <span className="font-body text-xs text-red-600">{fieldErrors.preferredBranch}</span>
          ) : null}
        </label>

        <label className="hidden flex-col gap-2 font-body text-sm text-charcoal md:flex">
          <span>{CONTACT_COPY.form.fields.treatmentLabel}</span>
          <select
            name="treatmentInterest"
            value={formState.treatmentInterest}
            onChange={(event) =>
              updateField('treatmentInterest', event.target.value as TreatmentIntentKey)
            }
            className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 font-body text-sm text-charcoal transition-colors duration-300 focus:border-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/30"
          >
            {TREATMENT_INTENTS.map((intent) => (
              <option key={intent.key} value={intent.key}>
                {intent.label}
              </option>
            ))}
          </select>
          {fieldErrors.treatmentInterest ? (
            <span className="font-body text-xs text-red-600">{fieldErrors.treatmentInterest}</span>
          ) : null}
        </label>
      </div>

      <label className="flex flex-col gap-2 font-body text-sm text-charcoal">
        <span>{CONTACT_COPY.form.fields.callbackLabel}</span>
        <select
          name="preferredCallbackTime"
          value={formState.preferredCallbackTime}
          onChange={(event) => updateField('preferredCallbackTime', event.target.value)}
          className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 font-body text-sm text-charcoal transition-colors duration-300 focus:border-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/30"
        >
          {CALLBACK_TIME_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {fieldErrors.preferredCallbackTime ? (
          <span className="font-body text-xs text-red-600">
            {fieldErrors.preferredCallbackTime}
          </span>
        ) : null}
      </label>

      <label className="flex flex-col gap-2 font-body text-sm text-charcoal">
        <span>{CONTACT_COPY.form.fields.messageLabel}</span>
        <textarea
          name="message"
          rows={4}
          value={formState.message}
          onChange={(event) => updateField('message', event.target.value)}
          className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 font-body text-sm text-charcoal transition-colors duration-300 focus:border-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/30"
          placeholder="Tell us your concern if you want the clinic to call back with more context…"
        />
        {fieldErrors.message ? (
          <span className="font-body text-xs text-red-600">{fieldErrors.message}</span>
        ) : null}
      </label>

      <label className="flex items-start gap-3 font-body text-sm leading-relaxed text-charcoal">
        <input
          name="consent"
          type="checkbox"
          checked={formState.consent}
          onChange={(event) => updateField('consent', event.target.checked)}
          className="mt-1 h-4 w-4 rounded-none border-gray-300 text-teal focus:ring-teal"
          required
        />
        <span>{CONTACT_COPY.form.fields.consentLabel}</span>
      </label>
      {fieldErrors.consent ? (
        <p className="font-body text-xs text-red-600">{fieldErrors.consent}</p>
      ) : null}

      {error ? (
        <p aria-live="polite" className="font-body text-sm text-red-600">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-navy py-4 font-body text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-teal disabled:cursor-not-allowed disabled:bg-navy/70"
      >
        {isSubmitting ? 'Submitting Request…' : CONTACT_COPY.form.fields.submitLabel}
      </button>

      <p className="font-body text-xs font-light leading-relaxed text-muted">
        After you submit, we guide you to the fastest next step for WhatsApp, call, or branch follow-up.
      </p>
    </form>
  );
}
