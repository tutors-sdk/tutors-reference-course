---
icon:
  type: fluent:box-24-filled
  color: secondary
masteryScore: 67
---

# SCORM Demo

A small SCORM 1.2 package, showcasing the `scorm` learning object type.

Tutors acts as the LMS here: it publishes the SCORM run-time API, hands the package the
learner's identity, and stores whatever the package reports back. Answer a question, leave
the page, and come back — the package resumes exactly where it was left, because Tutors
replayed its `suspend_data` to it.

Any conformant SCORM 1.2 or SCORM 2004 package can be dropped into a `scorm-*` folder in
the same way, either unpacked as it is here, or as the `.zip` a vendor ships.
