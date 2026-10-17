// Spice Math engine - freshness windows, recipe scaling and cabinet cost honesty.
// Freshness windows are a pantry rule people cite (ground 2-3 years, whole 3-4,
// dried herbs 1-3). Flavor fade is the only thing at stake; never a food-safety call.

function assertPositive(value, label) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(label + " must be above zero");
  }
}

function tenths(x) {
  return Math.floor(x * 10 + 0.5) / 10;
}

function fixed1(x) {
  return tenths(x).toFixed(1);
}

function money(x) {
  return "$" + x.toFixed(2);
}

const WINDOWS = {
  ground: { low: 24, high: 36, label: "ground spice" },
  whole: { low: 36, high: 48, label: "whole spice" },
  herb: { low: 12, high: 36, label: "dried herb" }
};

// The age truth: months in the rack against the cited window.
function ageTruth(type, months) {
  assertPositive(months, "the age");
  const w = WINDOWS[type];
  if (!w) {
    throw new Error("pick ground, whole or herb");
  }
  const window = "the cited " + w.low + "-to-" + w.high + "-month window";
  if (months <= w.low) {
    return "At " + months + " months, this " + w.label + " sits well inside " + window +
      " - the punch is still in the jar.";
  }
  if (months <= w.high) {
    return "At " + months + " months, this " + w.label + " is inside " + window +
      " but fading toward the edge - smell it before you trust it.";
  }
  return "At " + months + " months, this " + w.label + " is past " + window +
    " - if it smells like nothing, it tastes like nothing.";
}

// The scale truth: recipe teaspoons scaled to your servings, in spoons you own.
function scaleTruth(recipeTsp, recipeServings, yourServings) {
  assertPositive(recipeTsp, "the recipe amount");
  assertPositive(recipeServings, "the recipe servings");
  assertPositive(yourServings, "your servings");
  const need = tenths((recipeTsp * yourServings) / recipeServings);
  const tb = Math.floor(need / 3);
  const rem = tenths(need - tb * 3);
  const tspWord = need === 1 ? "teaspoon" : "teaspoons";
  const tbWord = tb === 1 ? "tablespoon" : "tablespoons";
  const remWord = rem === 1 ? "teaspoon" : "teaspoons";
  let spoons;
  if (tb === 0) {
    spoons = "the spoons do it directly";
  } else if (rem === 0) {
    spoons = "that is exactly " + tb + " " + tbWord;
  } else {
    spoons = "that is " + tb + " " + tbWord + " plus " + rem.toFixed(1) + " " + remWord;
  }
  return "Scaling " + fixed1(recipeTsp) + " " + (tenths(recipeTsp) === 1 ? "teaspoon" : "teaspoons") +
    " from " + recipeServings + " servings to " + yourServings + " asks " + need.toFixed(1) + " " +
    tspWord + " - " + spoons + ".";
}

// The cabinet truth: what the rack actually holds.
function cabinetTruth(jars, avgPrice) {
  assertPositive(jars, "the jar count");
  assertPositive(avgPrice, "the average price");
  const total = jars * avgPrice;
  return jars + " " + (jars === 1 ? "jar" : "jars") + " at " + money(avgPrice) +
    " each is " + money(total) + " of powder - the rack was the cheap part.";
}

if (typeof module !== "undefined") {
  module.exports = { ageTruth, scaleTruth, cabinetTruth, tenths, fixed1 };
}
