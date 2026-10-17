# Spice Math

Spice cabinet honesty. The paprika is decor, and the recipe's teaspoons were never meant for nine people. Spice Math checks jar age against the cited freshness windows, scales recipe teaspoons into spoons you own, and totals what the rack actually cost.

## What it computes

- **The age truth** - months in the rack against the cited windows (a pantry rule people cite: ground 2-3 years, whole 3-4, dried herbs 1-3). Flavor fade only, never a food-safety call.
- **The scale truth** - recipe teaspoons scaled to your servings, decomposed into tablespoons and teaspoons (3 teaspoons to a tablespoon, exactly).
- **The cabinet truth** - jars times average price: what the rack actually holds.

## Boundary

Illustrative arithmetic only. The freshness windows are a cited pantry rule and flavor fade is the only thing at stake - this page never makes a food-safety call.

## Files

- `index.html` - landing page with the honesty pitch and the boundary.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic, shared by the app and the tests.
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json` (16 cases).
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/spicemath/
Repo: https://github.com/iLanis-agent/spicemath
