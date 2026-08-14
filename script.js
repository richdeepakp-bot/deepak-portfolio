const beliefs = [
  "I don't design to impress. I design to solve, simplify, and make things work.",
  "Every interaction should solve a problem.",
  "People shouldn't learn the interface. The interface should understand people.",
  "Good design removes questions before they are asked."
];

const belief = document.querySelector(".belief-text");
let beliefIndex = 0;
let beliefTimer;

function typeBelief(text) {
  clearTimeout(beliefTimer);
  belief.classList.remove("belief-glow", "belief-fade");

  let i = 0;

  function tick() {
    belief.textContent = text.slice(0, i++);
    if (i <= text.length) {
      beliefTimer = setTimeout(tick, 42);
    } else {
      // Give the reader a generous pause, then briefly glow before fading.
      beliefTimer = setTimeout(() => {
        belief.classList.add("belief-glow");
        beliefTimer = setTimeout(() => {
          belief.classList.remove("belief-glow");
          belief.classList.add("belief-fade");

          beliefTimer = setTimeout(() => {
            belief.classList.remove("belief-fade");
            beliefIndex = (beliefIndex + 1) % beliefs.length;
            typeBelief(beliefs[beliefIndex]);
          }, 700);
        }, 900);
      }, 5200);
    }
  }

  tick();
}

typeBelief(beliefs[0]);

const steps = [...document.querySelectorAll(".steps li")];
let stepIndex = 0;

setInterval(() => {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === stepIndex);
  });
  stepIndex = (stepIndex + 1) % steps.length;
}, 1100);

const collab = document.querySelector(".collaboration-card");
const cursors = document.querySelectorAll(".cursor");

collab.addEventListener("pointermove", event => {
  const rect = collab.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  cursors[0].style.transform = `translate(${x * -10}px, ${y * -8}px)`;
  cursors[1].style.transform = `translate(${x * 10}px, ${y * 8}px)`;
});

collab.addEventListener("pointerleave", () => {
  cursors.forEach(cursor => cursor.style.transform = "");
});
