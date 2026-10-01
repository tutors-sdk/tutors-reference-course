---
icon:
  type: fluent-color:question-circle-20
---

# Quiz Demo

This is a quiz learning object: an ordinary markdown document containing one
fenced ` ```quiz ` block. The folder name begins with `quiz`, which is what
gives the learning object its type.

```quiz
title: JavaScript Fundamentals
---
question: Which keyword declares a block-scoped variable that cannot be reassigned?
type: multiple-choice
options:
  - var
  - let
  - const
  - static
correct: 2
---
question: What does `typeof null` return in JavaScript?
type: multiple-choice
options:
  - "null"
  - "object"
  - "undefined"
correct: 1
---
question: Arrow functions have their own `this` binding.
type: true-false
correct: false
```

Prose outside the block renders normally, so a quiz can carry its own
instructions, links or diagrams.
