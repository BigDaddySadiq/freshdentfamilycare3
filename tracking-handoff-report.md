# Tracking Handoff Report

## Summary
Fresh Dent Family Care now has a centralized tracking layer designed for later GTM and GA4 hookup without scattering event logic across the UI. The implementation focuses on measurable lead actions, treatment intent, branch context, CTA attribution, and future UTM continuity.

## Events Implemented
- `whatsapp_click`
- `call_click`
- `form_submit`
- `directions_click`
- `appointment_cta_click`
- `treatment_page_view`
- `branch_select`
- `treatment_select`
- `thank_you_page_view`

## Event Naming Map
- `whatsapp_click`: Primary messaging conversion intent
- `call_click`: Phone call intent
- `form_submit`: Appointment callback form completion
- `directions_click`: Maps and branch-navigation intent
- `appointment_cta_click`: Non-WhatsApp appointment and callback CTA engagement
- `treatment_page_view`: Dedicated treatment landing page view
- `branch_select`: Explicit branch selection interaction
- `treatment_select`: Explicit treatment-interest selection interaction
- `thank_you_page_view`: Post-submission confirmation view

## Central Tracking Architecture
### Core tracking utility
- File: [tracking.ts](C:/Users/bigdaddysadiq/OneDrive/Desktop/codex%20freshdent/lib/tracking.ts)
- Responsibilities:
  - central event-name constants
  - shared payload typing
  - attribution capture from landing URL
  - page context enrichment
  - dispatch to `window.dataLayer`
  - optional pass-through to `window.gtag`

### Tracked CTA wrapper
- File: [TrackedLink.tsx](C:/Users/bigdaddysadiq/OneDrive/Desktop/codex%20freshdent/components/cta/TrackedLink.tsx)
- Responsibilities:
  - shared click tracking wrapper for CTA links
  - attaches `destination_href`
  - attaches `cta_label`
  - keeps CTA instrumentation consistent without repeating event plumbing everywhere

### Reusable CTA group
- File: [LeadActionGroup.tsx](C:/Users/bigdaddysadiq/OneDrive/Desktop/codex%20freshdent/components/cta/LeadActionGroup.tsx)
- Responsibilities:
  - centralized WhatsApp, call, directions, and callback CTA tracking
  - preserves branch and treatment context across CTA clusters

## Payload Structure
### Common payload fields
These can now appear on tracked events where relevant:
- `event`
- `source`
- `branch_id`
- `treatment_intent`
- `treatment_page`
- `submission_id`
- `callback_time`
- `cta_label`
- `destination_href`
- `page_path`
- `page_url`
- `page_title`
- `landing_path`
- `landing_search`
- `referrer`
- stored UTM params when present:
  - `utm_source`
  - `utm_medium`
  - `utm_campaign`
  - `utm_term`
  - `utm_content`
  - `gclid`
  - `fbclid`

### Attribution behavior
- Landing-page attribution is captured once on the client and stored in local storage.
- Subsequent events inherit that attribution automatically.
- This gives GTM/GA4 a stable handoff path for campaign analysis later.

## Where Each Event Fires
### `whatsapp_click`
Fires from tracked WhatsApp actions across the site, including:
- navbar and mobile menu
- hero primary CTA
- hero treatment shortcut strip where applicable
- service cards `Enquire`
- services next-step CTA
- welcome section CTA
- contact decision cards
- contact CTA groups
- branch cards
- testimonials CTA group
- FAQ CTA group
- CTA banner CTA group
- floating mobile and desktop WhatsApp actions
- footer WhatsApp CTA
- thank-you page CTA group
- treatment page CTA groups

Typical metadata:
- `source`
- `branch_id` when branch-specific
- `treatment_intent` when service/treatment-specific
- `cta_label`
- `destination_href`
- page context
- stored attribution

### `call_click`
Fires from:
- navbar desktop and mobile menu phone links
- contact CTA group
- CTA banner tertiary phone link
- floating mobile call button
- footer phone links
- branch CTA groups
- thank-you page CTA group
- treatment page CTA groups

Typical metadata:
- `source`
- `branch_id`
- optional `treatment_intent`
- `cta_label`
- `destination_href`

### `form_submit`
Fires on successful appointment request submission.
- File: [AppointmentRequestForm.tsx](C:/Users/bigdaddysadiq/OneDrive/Desktop/codex%20freshdent/components/forms/AppointmentRequestForm.tsx)

Typical metadata:
- `source: appointment-form`
- `branch_id`
- `treatment_intent`
- `callback_time`
- `submission_id`
- `cta_label`
- page context
- stored attribution

### `directions_click`
Fires from:
- floating mobile directions CTA
- contact CTA group
- branch CTA groups
- footer branch direction links
- thank-you page CTA group
- treatment page CTA groups

Typical metadata:
- `source`
- `branch_id`
- `cta_label`
- `destination_href`

### `appointment_cta_click`
Fires from non-WhatsApp appointment-oriented links, including:
- hero secondary CTA
- hero shortcut strip
- services discovery shortcuts
- service-card treatment detail links
- services next-step callback CTA
- contact decision cards for callback/form pathways
- footer callback and branch-compare links
- treatment related-service links
- callback-form links inside reusable CTA groups

Typical metadata:
- `source`
- optional `branch_id`
- optional `treatment_intent`
- optional `treatment_page`
- `cta_label`
- `destination_href`

### `treatment_page_view`
Fires on dedicated treatment landing pages.
- File: [page.tsx](C:/Users/bigdaddysadiq/OneDrive/Desktop/codex%20freshdent/app/services/[slug]/page.tsx)

Typical metadata:
- `treatment_page`
- `treatment_intent`
- page context
- stored attribution

### `branch_select`
Fires when a visitor explicitly changes the preferred branch in the callback form.
- File: [AppointmentRequestForm.tsx](C:/Users/bigdaddysadiq/OneDrive/Desktop/codex%20freshdent/components/forms/AppointmentRequestForm.tsx)

Typical metadata:
- `source: appointment-form`
- `branch_id`
- page context
- stored attribution

### `treatment_select`
Fires when a visitor explicitly changes treatment interest in the callback form.
- File: [AppointmentRequestForm.tsx](C:/Users/bigdaddysadiq/OneDrive/Desktop/codex%20freshdent/components/forms/AppointmentRequestForm.tsx)

Typical metadata:
- `source: appointment-form`
- `treatment_intent`
- page context
- stored attribution

### `thank_you_page_view`
Fires on the thank-you page after a successful form submission.
- File: [page.tsx](C:/Users/bigdaddysadiq/OneDrive/Desktop/codex%20freshdent/app/thank-you/page.tsx)

Typical metadata:
- `branch_id`
- `treatment_intent`
- `source`
- `submission_id`
- page context
- stored attribution

## GTM / GA4 Handoff: What Is Ready
The site is now ready for GTM or GA4 connection because:
- event names are centralized
- payload keys are standardized
- click tracking is wrapped in reusable components
- page context is auto-attached
- attribution fields are preserved
- thank-you-state measurement exists
- branch and treatment context are no longer ambiguous on key conversion paths

## What Still Needs To Be Connected For GTM / GA4
### GTM
- add the GTM container snippet to the app shell
- create dataLayer-based triggers for each event name
- map payload keys into GTM variables
- forward selected variables into GA4 event parameters

### GA4
- define event parameter schema in GA4 naming conventions
- register useful custom dimensions such as:
  - `source`
  - `branch_id`
  - `treatment_intent`
  - `cta_label`
  - `treatment_page`
- optionally mark these as key events:
  - `whatsapp_click`
  - `form_submit`
  - `call_click`
  - `thank_you_page_view`

### Optional next instrumentation layer
- scroll-depth or engagement markers on treatment pages
- FAQ expand tracking if the clinic wants to measure objection handling
- testimonial interaction tracking if later used for decision support
- branch-comparison engagement tracking beyond CTA clicks

## Missing Or Previously Weak Areas That Were Resolved
- CTA tracking was present but inconsistent in click labeling
- not all major CTAs clearly identified themselves by label
- destination URLs were not consistently attached to click events
- event payloads were not standardized enough for clean GTM mapping
- branch and treatment context were not uniformly present on all lead actions

## Recommended Dashboard KPIs For The Clinic
### Primary conversion KPIs
- WhatsApp clicks by page
- WhatsApp clicks by treatment intent
- WhatsApp clicks by branch context
- form submissions by treatment interest
- form submissions by branch
- thank-you page views

### Secondary intent KPIs
- call clicks by page
- directions clicks by branch
- appointment CTA clicks by CTA label
- treatment page views by landing source
- branch selection frequency
- treatment selection frequency

### Acquisition and attribution KPIs
- conversion events by `utm_source`
- conversion events by `utm_campaign`
- treatment-page conversion rate by landing path
- thank-you views by campaign/source/medium

### CRO reporting cuts
- hero CTA vs services CTA vs footer CTA
- branch-1 vs branch-2 conversion intent
- treatment-page visitors vs homepage visitors
- mobile callback form completions by selected treatment

## Recommended Next Step After This Tracking Pass
- Connect GTM first, not direct hardcoded GA4 tags across the app.
- In GTM, map the existing dataLayer events and validate them in preview mode.
- Then create a simple clinic dashboard focused on:
  - WhatsApp clicks
  - form submits
  - calls
  - directions
  - top treatments
  - top branches

## Validation Completed
- production build passed after the tracking updates
- event architecture remains centralized and maintainable
- thank-you page tracking already exists and remains compatible with the form flow
