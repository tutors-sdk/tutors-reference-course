/*
 * A minimal SCORM 1.2 SCO.
 *
 * Written the way real content is written — plain ES5, no build step, no dependencies —
 * so it runs unchanged in Tutors, in Moodle, or in SCORM Cloud. Nothing here is specific
 * to Tutors: it finds whatever LMS is hosting it by walking up the window chain, and
 * talks to it through the eight standard API calls.
 */
(function () {
  "use strict";

  var QUESTIONS = [
    {
      text: "What does a SCORM package contain that tells an LMS how to launch it?",
      options: ["imsmanifest.xml", "package.json", "index.html", "A README"],
      answer: 0
    },
    {
      text: "Which window property does a SCORM 1.2 package look for?",
      options: ["window.SCORM", "window.API", "window.API_1484_11", "window.LMS"],
      answer: 1
    },
    {
      text: "Where does a SCO store progress it wants back on its next launch?",
      options: ["A cookie", "cmi.core.entry", "cmi.suspend_data", "localStorage"],
      answer: 2
    }
  ];

  var MASTERY_SCORE = 67;

  var api = null;
  var answers = [];
  var startedAt = 0;

  /**
   * Find the LMS.
   *
   * The API lives on an ancestor window rather than this one, because the LMS creates it
   * before framing the content. The search is depth-limited so a deeply nested frame does
   * not walk forever, which is what the specification's own pseudo-code does.
   */
  function findApi(win) {
    var depth = 0;
    while (win && depth < 10) {
      if (win.API) return win.API;
      if (win.parent === win) break;
      win = win.parent;
      depth += 1;
    }
    return window.opener ? findApi(window.opener) : null;
  }

  function get(element) {
    return api ? api.LMSGetValue(element) : "";
  }

  function set(element, value) {
    if (api) api.LMSSetValue(element, String(value));
  }

  /** Restore answers from the previous attempt; ignore anything unrecognisable. */
  function restore() {
    var saved = get("cmi.suspend_data");
    answers = [];
    if (!saved) return;
    var parts = saved.split(",");
    for (var i = 0; i < QUESTIONS.length; i += 1) {
      var value = parseInt(parts[i], 10);
      answers[i] = isNaN(value) ? null : value;
    }
  }

  function correctCount() {
    var count = 0;
    for (var i = 0; i < QUESTIONS.length; i += 1) {
      if (answers[i] === QUESTIONS[i].answer) count += 1;
    }
    return count;
  }

  function answeredCount() {
    var count = 0;
    for (var i = 0; i < QUESTIONS.length; i += 1) {
      if (answers[i] !== null && answers[i] !== undefined) count += 1;
    }
    return count;
  }

  /** SCORM 1.2 wants elapsed time as HHHH:MM:SS.SS, not as a number of seconds. */
  function sessionTime() {
    var total = Math.floor((Date.now() - startedAt) / 1000);
    var pad = function (value) {
      return (value < 10 ? "0" : "") + value;
    };
    return pad(Math.floor(total / 3600)) + ":" + pad(Math.floor((total % 3600) / 60)) + ":" + pad(total % 60) + ".00";
  }

  /** Report the attempt so far, and ask the LMS to persist it. */
  function report() {
    var score = Math.round((correctCount() / QUESTIONS.length) * 100);
    set("cmi.core.score.raw", score);
    set("cmi.core.score.min", 0);
    set("cmi.core.score.max", 100);
    set("cmi.suspend_data", answers.join(","));

    if (answeredCount() < QUESTIONS.length) {
      set("cmi.core.lesson_status", "incomplete");
      // Ask to be resumed rather than restarted next time.
      set("cmi.core.exit", "suspend");
    } else {
      set("cmi.core.lesson_status", score >= MASTERY_SCORE ? "passed" : "failed");
      set("cmi.core.exit", "");
    }
    set("cmi.core.session_time", sessionTime());
    if (api) api.LMSCommit("");
    render();
  }

  function choose(question, option) {
    answers[question] = option;
    report();
  }

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function render() {
    var root = document.getElementById("sco");
    root.innerHTML = "";

    QUESTIONS.forEach(function (question, index) {
      var card = element("div", "question");
      card.appendChild(element("p", "prompt", index + 1 + ". " + question.text));

      var list = element("div", "options");
      question.options.forEach(function (option, optionIndex) {
        var button = element("button", "option", option);
        if (answers[index] === optionIndex) {
          button.className += optionIndex === question.answer ? " correct" : " wrong";
        }
        button.addEventListener("click", function () {
          choose(index, optionIndex);
        });
        list.appendChild(button);
      });
      card.appendChild(list);
      root.appendChild(card);
    });

    var status = get("cmi.core.lesson_status") || "not attempted";
    var summary = element("p", "summary");
    summary.textContent = correctCount() + " of " + QUESTIONS.length + " correct — reported to the LMS as “" + status + "”.";
    root.appendChild(summary);
  }

  function start() {
    startedAt = Date.now();
    api = findApi(window);
    var banner = document.getElementById("banner");

    if (!api) {
      banner.textContent = "No SCORM run-time found — this package is running outside an LMS, so nothing will be saved.";
      banner.className = "banner warning";
      render();
      return;
    }

    api.LMSInitialize("");
    restore();

    var learner = get("cmi.core.student_name") || "learner";
    var resumed = get("cmi.core.entry") === "resume";
    banner.textContent = resumed
      ? "Welcome back, " + learner + " — your previous answers were restored by the LMS."
      : "Hello " + learner + " — this is a fresh attempt.";
    render();
  }

  // pagehide rather than unload, so the attempt is still saved when the browser puts the
  // page in its back/forward cache instead of tearing it down.
  window.addEventListener("pagehide", function () {
    if (!api) return;
    set("cmi.core.session_time", sessionTime());
    api.LMSCommit("");
    api.LMSFinish("");
    api = null;
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
