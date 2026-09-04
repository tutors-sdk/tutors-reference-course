---
icon:
  type: fluent-color:question-circle-20
---

# Quiz Demo

This note demonstrates an embedded quiz. The block below is authored as a
fenced ` ```quiz ` code block and is hydrated into an interactive quiz card by
the `quizify` action.

```quiz
title: JavaScript Fundamentals
time_limit: 30
---
type: multiple-choice
text: Which keyword declares a block-scoped variable that cannot be reassigned?
options:
  - var
  - let
  - const
  - static
correct: 2
---
type: multiple-choice
text: What does `typeof null` return in JavaScript?
options:
  - "null"
  - "object"
  - "undefined"
correct: 1
---
type: true-false
text: Arrow functions have their own `this` binding.
correct: false
```

Some trailing text after the quiz, to confirm the surrounding note content still
renders normally.
