---
name: a11y-review
description: Review the current UI only for accessibility and screen-reader risks.
---

Review only the files changed in the current stage.

Check:
- semantic HTML
- labels and accessible names
- keyboard navigation
- focus order and visible focus
- skip link
- heading hierarchy
- live regions
- duplicate announcements
- form error association
- contrast
- touch target size
- screen-reader speech conflicts
- SPA navigation announcements

Do not change code.

Output:
file/line, issue, user impact, severity, recommended fix.

End with manual NVDA/TalkBack/VoiceOver checks that automation cannot prove.
