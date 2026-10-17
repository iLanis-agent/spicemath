import json, math

def tenths(x):
    return math.floor(x * 10 + 0.5) / 10

def fixed1(x):
    return f"{tenths(x):.1f}"

def money(x):
    return f"${x:.2f}"

WINDOWS = {
    "ground": (24, 36, "ground spice"),
    "whole": (36, 48, "whole spice"),
    "herb": (12, 36, "dried herb"),
}

def age_truth(t, months):
    low, high, label = WINDOWS[t]
    window = f"the cited {low}-to-{high}-month window"
    if months <= low:
        return (f"At {months} months, this {label} sits well inside {window} - "
                f"the punch is still in the jar.")
    if months <= high:
        return (f"At {months} months, this {label} is inside {window} but fading toward "
                f"the edge - smell it before you trust it.")
    return (f"At {months} months, this {label} is past {window} - if it smells like "
            f"nothing, it tastes like nothing.")

def scale_truth(tsp, serves, yours):
    need = tenths(tsp * yours / serves)
    tb = math.floor(need / 3)
    rem = tenths(need - tb * 3)
    tsp_word = "teaspoon" if need == 1 else "teaspoons"
    tb_word = "tablespoon" if tb == 1 else "tablespoons"
    rem_word = "teaspoon" if rem == 1 else "teaspoons"
    if tb == 0:
        spoons = "the spoons do it directly"
    elif rem == 0:
        spoons = f"that is exactly {tb} {tb_word}"
    else:
        spoons = f"that is {tb} {tb_word} plus {rem:.1f} {rem_word}"
    src_word = "teaspoon" if tenths(tsp) == 1 else "teaspoons"
    return (f"Scaling {fixed1(tsp)} {src_word} from {serves} servings to {yours} asks "
            f"{need:.1f} {tsp_word} - {spoons}.")

def cabinet_truth(jars, price):
    total = jars * price
    word = "jar" if jars == 1 else "jars"
    return f"{jars} {word} at {money(price)} each is {money(total)} of powder - the rack was the cheap part."

cases = []
for t, m in [("ground", 18), ("ground", 30), ("ground", 40), ("whole", 40), ("herb", 10), ("herb", 40), ("whole", 50)]:
    cases.append({"fn": "ageTruth", "args": [t, m], "expected": age_truth(t, m)})
for tsp, s, y in [(1.5, 4, 6), (2, 4, 9), (1, 4, 12), (0.5, 4, 2), (1, 2, 6)]:
    cases.append({"fn": "scaleTruth", "args": [tsp, s, y], "expected": scale_truth(tsp, s, y)})
for j, p in [(18, 4.5), (30, 3.99), (1, 5), (12, 8)]:
    cases.append({"fn": "cabinetTruth", "args": [j, p], "expected": cabinet_truth(j, p)})

with open("expected.json", "w") as f:
    json.dump(cases, f, indent=2)
    f.write("\n")
print(len(cases), "cases written")
