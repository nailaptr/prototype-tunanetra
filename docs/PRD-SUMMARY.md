# PRD Summary

## Acceptance targets
- Login, chat, image flow dapat digunakan dengan keyboard + screen reader.
- Tidak ada critical accessibility violation.
- Jawaban AI dapat dibaca melalui live region/TTS.
- Gambar dijelaskan pada sebagian besar skenario uji dan kegagalan dicatat.
- Tidak ada API key di client/repository.
- Dokumentasi testing dan limitations tersedia.

## Functional requirements
FR-01 register
FR-02 login/logout
FR-03 protected routes
FR-04 accessible form errors
FR-05 text chat
FR-06 speech-to-text id-ID
FR-07 text-to-speech
FR-08 image upload JPEG/PNG/WebP <= 4 MB
FR-09 screen capture on supported PC browser
FR-10 privacy consent before first image
FR-11 plain-text numbered response
FR-12 platform + screen reader context
FR-13 conversation history
FR-14 settings
FR-15 friendly AI/network error
FR-16 per-user rate limit

## Core accessibility requirements
WCAG 2.2 AA; semantic HTML; keyboard-only; visible focus; skip link; aria-live; accessible names; 4.5:1 contrast; 44px touch target; no screen-reader shortcut conflicts; optional auto-speech.

## Main data model
`user_settings(user_id, speech_rate, font_scale, high_contrast, auto_speak, platform, screen_reader, updated_at)`
`conversations(id, user_id, title, created_at)`
`messages(id, conversation_id, user_id, role, content, created_at)`
`usage_events(id, user_id, kind, created_at)`

## Main stages
P0 context/plan
P1 scaffold + DB
P2 authentication
P3 accessibility foundation
P4 AI core + endpoint
P5 accessible chat UI
P6 STT/TTS
P7 image/screen analysis
P8 settings + history
P9 testing + final audit

Rule: if a gate fails, fix the current stage before proceeding.
