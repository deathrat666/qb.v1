# HeroQ Acceptance Tests

Pause-frame checks to verify the Q-tumble animation. The rings are arranged
as a symmetric Hopf pair so a 180° rotation around the swap axis literally
trades their places — every spin produces a "new Q" in the original Q's
screen position, with the former tail now serving as the bowl.

Geometry:
- Two rings in the inner `animGroup`. One starts as the BOWL at
  `(0, +0.3, 0)` with normal `+Z`; the other starts as the TAIL at
  `(0, -0.3, 0)` with normal `+X`.
- No outer tilt — the rest pose is face-on to the camera (bowl squarely
  facing the viewer, tail edge-on below it).

Animation:
- `swapAxis = (1, 0, 1)/√2` in the inner frame. 180° rotation around this
  axis swaps the two rings' positions AND normals exactly.
- Timing: `DWELL = 1 s`, `SPIN = 2 s`, `CYCLE = 3 s`. Each cycle is a 1 s
  motionless dwell at a Q-pose followed by a 2 s `easeInOutSine` spin
  through 180° that lands on the next Q-pose. Repeats forever, so the Q
  blinks: still → spin → still → spin → …
- Cumulative rotation angle is `(cycleIdx + spinPhase) · π`, so dwells
  always fall on `angle = kπ` — exact Q-poses, no drift.
- Ring scales animate so the ring currently in the TAIL position is always
  `0.85` and the one in the BOWL position is always `1.0`. During a spin
  both rings pass through a shared mid-tumble scale.

---

## Test 1 — t ∈ [0, 1) s (initial rest, face-on Q)

**What to look for:**
- Q is completely motionless — no rotation or drift for a full second
  after mount.
- Bowl ring is face-on to the camera (flat circle), sitting above the
  tail ring which is edge-on (vertical-ish line/ellipse below).
- No angled/diagonal tilt — the pose reads as a flat, front-facing Q
  rather than the previous 3D-tilted diagonal.
- Background is `#0a0a0a`, rings are light grey (`#f2f2f2`).

**Failure:** Any motion before t = 1 s → dwell-gate bug. Tilted/angled
pose → outer rotation wasn't removed.

---

## Test 2 — t ≈ 2 s (mid-spin)

**What to look for:**
- Shape is mid-tumble, both rings visibly rotated away from the Q pose.
- Neither ring is purely face-on — both read as ellipses/tilted loops.
- Both rings are at roughly the same scale (`~0.925`) — the "shared
  mid-tumble size" as they hand off roles.
- Motion direction is a forward tip around the swap axis, not a Y-axis
  turntable spin.

**Failure:** One ring stays perfectly face-on → swap axis collapsed to Y
(turntable bug). Or ring scales don't converge → scale-interpolation bug.

---

## Test 3 — t ∈ [3, 4) s (second dwell, SECOND Q in the first Q's position)

**What to look for:**
- Silhouette matches Test 1 — same face-on bowl on top, same tail below.
- This is the "new Q": the ring that started as the tail is now the bowl
  (still scale 1.0 in the bowl position), and the original bowl has become
  the tail (scale 0.85 in the tail position).
- Because scales track ROLE (not ring identity), this Q should be visually
  indistinguishable from the Q at t ∈ [0, 1).
- Motion is frozen for the full 1 s dwell.

**Failure:**
- Different-looking Q pose than Test 1 → swap symmetry broken.
- Tail clearly larger than bowl → scale-animation phase inverted.
- Any motion during the dwell → timing bug.

---

## Test 4 — t ≈ 6 s (after two full cycles, back to original roles)

**What to look for:**
- Dwell at a face-on Q identical to Test 1, with the original bowl ring
  back in the bowl position (original roles restored).
- No snap/jump entering or leaving the dwell.

**Failure:** Pose drifts from Test 1 (quaternion accumulation bug) or
visible jerk at the spin→dwell transition.

---

## Debug pause

The component previously exposed `window.__heroQTime` as a time override
for scrubbing. Removed for production. Re-add it in `useFrame` temporarily
when iterating on pose tuning.

## Visual verification note

These tests require eyeballing the running page. To check them:

1. Run `npm run dev` (port 3000 by default, or use `.claude/launch.json` to
   pin `qbyte-dev` at port 5174).
2. Open the landing page and watch several cycles. You should see a clear
   blink rhythm: 1 s of stillness, a 2 s spin, 1 s of stillness, a 2 s
   spin, and so on.
3. Compare against the reference frames extracted from
   `contexts/qbyte animation .mp4`.

If you cannot visually verify, say so explicitly — do not claim the tests
pass.
