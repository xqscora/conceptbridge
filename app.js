const conceptBank = {
  photosynthesis: {
    keywords: ["sunlight", "light", "plants", "food", "carbon", "water"],
    claim: "A plant uses light energy to transform water and carbon dioxide into stored chemical energy.",
    edge: "A plant has water and carbon dioxide but no usable light. It cannot keep producing food simply because the ingredients are present.",
    question: "If a plant is watered and placed in complete darkness, would your explanation predict continued food production? Why?"
  },
  gravity: {
    keywords: ["mass", "force", "earth", "fall", "attract", "down"],
    claim: "Masses interact through attraction, and near Earth that interaction produces downward acceleration.",
    edge: "An object can be moving upward while gravity still acts downward; ‘gravity makes everything move down’ confuses force with current motion.",
    question: "If you throw a ball upward, does gravity disappear during the ascent? What does your model predict?"
  },
  recursion: {
    keywords: ["function", "itself", "base", "stop", "call", "smaller"],
    claim: "A recursive process repeats a rule on a smaller or simpler input until a base condition stops it.",
    edge: "A function that calls itself without moving toward a base condition does not become recursive success; it becomes an unbounded loop.",
    question: "What specific condition guarantees that the next recursive call is closer to stopping?"
  }
};

function tokenize(text) { return text.toLowerCase().match(/[a-z]+/g) || []; }
function score(entry, text) { const words = new Set(tokenize(text)); return entry.keywords.filter(word => words.has(word)).length / entry.keywords.length; }
function chooseEntry(concept, explanation) {
  const direct = conceptBank[concept.trim().toLowerCase()];
  if (direct) return [direct, Math.max(.72, score(direct, explanation))];
  const ranked = Object.values(conceptBank).map(entry => [entry, score(entry, `${concept} ${explanation}`)]).sort((a, b) => b[1] - a[1]);
  return [ranked[0][0], Math.max(.35, ranked[0][1])];
}

const $ = id => document.querySelector(`#${id}`);
let original = "";
let currentEdge = "";

$("bridge").addEventListener("click", () => {
  original = $("explanation").value.trim();
  const [entry, confidence] = chooseEntry($("concept").value, original);
  currentEdge = entry.edge;
  $("claim").textContent = entry.claim;
  $("edge").textContent = entry.edge;
  $("question").textContent = entry.question;
  $("confidence").textContent = `${Math.round(confidence * 100)}% match`;
  $("before").textContent = original || "(empty explanation)";
  $("status").textContent = "Boundary test built from the local retrieval model.";
});

$("reflect").addEventListener("click", () => {
  const answer = $("answer").value.trim();
  $("feedback").textContent = answer ? "Prediction recorded. Compare it with the edge case, then revise in your own words." : "Write a prediction before comparing it.";
});

$("save").addEventListener("click", () => {
  const revision = $("revision").value.trim();
  $("after").textContent = revision || "No revision written yet.";
  $("feedback").textContent = revision ? "Reflection saved locally by the author." : "Add a revised explanation first.";
});
