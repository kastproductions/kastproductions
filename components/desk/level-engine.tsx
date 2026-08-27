"use client";

import { useEffect } from "react";

/**
 * The desk's one motion system.
 *
 * Every needle, lamp and lit strip on the page reads three numbers that this
 * engine publishes on the document element: `--vu-l`, `--vu-r` and
 * `--vu-drive`. Nothing else animates on a timer.
 *
 * Two rules make it an instrument rather than an effect:
 *
 * 1. It measures something real. The drive is the visitor's own activity —
 *    scroll speed and pointer speed. No synthetic audio, so the meters never
 *    imply a measurement of the studio that nobody took.
 * 2. It obeys VU ballistics. A VU meter reaches 99% of its reading in 300ms
 *    and overshoots by about 1.5%, because it is a moving coil with mass. That
 *    is a lightly damped second-order system, integrated here per frame, so
 *    the needles have weight and never snap to a value.
 *
 * Cost is bounded on both ends: the loop never starts under reduced motion,
 * stops when the tab is hidden, and stops again as soon as the needles have
 * settled at rest with no input. It writes three custom properties and no
 * layout-affecting style.
 */

/* Damping ratio 0.8 and a natural frequency of 16.7 rad/s put the 2% settling
 * time at ~300ms with ~1.5% overshoot: a VU movement, in two constants. */
const STIFFNESS = 16.7 * 16.7;
const DAMPING = 2 * 0.8 * 16.7;

/* Resting deflection. A powered desk with nothing playing does not sit on the
 * left pin; it shows room noise just above -20. The two channels rest a little
 * apart because no two moving coils zero at the same place, and a pair that
 * reads identically at idle looks like one movement drawn twice. Under signal
 * they converge, which is what being ganged means. */
const REST_L = 0.07;
const REST_R = 0.098;

/* Full deflection at a brisk flick-scroll, and at a fast pointer sweep. */
const SCROLL_REF = 2200; // px/s
const POINTER_REF = 3000; // px/s
const POINTER_WEIGHT = 0.55;

/* The power-on self-test: gear slams its needles to full scale, then lets them
 * fall. Same ballistics, so the fall is the movement's own. */
const POWER_ON_MS = 320;

/* Stop the loop once the movement is quiet and the visitor is idle. */
const IDLE_MS = 1100;

type Channel = { x: number; v: number };

function integrate(channel: Channel, target: number, dt: number) {
  const acceleration =
    (target - channel.x) * STIFFNESS - channel.v * DAMPING;
  channel.v += acceleration * dt;
  channel.x += channel.v * dt;
  if (channel.x < 0) {
    // The pin at the left end of the scale is a physical stop, not a number.
    channel.x = 0;
    channel.v = Math.abs(channel.v) * 0.12;
  }
}

export function LevelEngine() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let running = false;
    let scrollAccum = 0;
    let pointerAccum = 0;
    let lastScrollY = window.scrollY;
    let lastPointer: { x: number; y: number } | null = null;
    let lastInput = 0;
    let lastFrame = 0;
    let startedAt = 0;
    let poweredOn = false;

    const left: Channel = { x: REST_L, v: 0 };
    const right: Channel = { x: REST_R, v: 0 };
    /* The right channel follows the left through a one-pole lag: a matched
     * pair tracks together without ever reading identically. */
    let laggedTarget = REST_L;

    const published = { l: -1, r: -1, d: -1 };

    const publish = (l: number, r: number, drive: number) => {
      const nl = Math.round(l * 1e4) / 1e4;
      const nr = Math.round(r * 1e4) / 1e4;
      const nd = Math.round(drive * 1e3) / 1e3;
      if (nl !== published.l) {
        published.l = nl;
        root.style.setProperty("--vu-l", String(nl));
      }
      if (nr !== published.r) {
        published.r = nr;
        root.style.setProperty("--vu-r", String(nr));
      }
      if (nd !== published.d) {
        published.d = nd;
        root.style.setProperty("--vu-drive", String(nd));
      }
    };

    const tick = (now: number) => {
      // Clamped so a backgrounded tab resuming cannot integrate a huge step.
      const dt = Math.min((now - lastFrame) / 1000, 1 / 30);
      lastFrame = now;

      let drive = 0;
      if (!poweredOn) {
        if (now - startedAt < POWER_ON_MS) {
          drive = 1;
        } else {
          poweredOn = true;
          lastInput = now;
        }
      } else {
        const scrollSpeed = dt > 0 ? scrollAccum / dt : 0;
        const pointerSpeed = dt > 0 ? pointerAccum / dt : 0;
        const raw =
          scrollSpeed / SCROLL_REF +
          (pointerSpeed / POINTER_REF) * POINTER_WEIGHT;
        // Shaped so ordinary reading speed already registers on the scale.
        drive = Math.min(Math.pow(Math.min(raw, 1), 0.72), 1);
      }
      scrollAccum = 0;
      pointerAccum = 0;

      const target = REST_L + (1 - REST_L) * drive;
      laggedTarget += (target - laggedTarget) * Math.min(dt * 26, 1);

      integrate(left, target, dt);
      // The right unit zeroes higher and tracks at 96.5% of the lagged target,
      // so the pair converges as the signal rises and separates again at idle.
      integrate(right, REST_R + (laggedTarget - REST_L) * 0.965, dt);

      publish(left.x, right.x, drive);

      const settled =
        poweredOn &&
        now - lastInput > IDLE_MS &&
        Math.abs(left.x - REST_L) < 0.002 &&
        Math.abs(right.x - REST_R) < 0.002 &&
        Math.abs(left.v) < 0.02 &&
        Math.abs(right.v) < 0.02;

      if (settled) {
        left.x = REST_L;
        right.x = REST_R;
        left.v = 0;
        right.v = 0;
        publish(REST_L, REST_R, 0);
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduced.matches || document.hidden) return;
      running = true;
      lastFrame = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onScroll = () => {
      const y = window.scrollY;
      scrollAccum += Math.abs(y - lastScrollY);
      lastScrollY = y;
      lastInput = performance.now();
      start();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (lastPointer) {
        pointerAccum += Math.hypot(
          event.clientX - lastPointer.x,
          event.clientY - lastPointer.y,
        );
      }
      lastPointer = { x: event.clientX, y: event.clientY };
      lastInput = performance.now();
      start();
    };

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        poweredOn = true;
        lastInput = performance.now();
        start();
      }
    };

    const onReducedChange = () => {
      if (reduced.matches) {
        stop();
        publish(REST_L, REST_R, 0);
      } else {
        poweredOn = true;
        start();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onReducedChange);

    if (!reduced.matches) {
      startedAt = performance.now();
      lastInput = startedAt;
      start();
    }

    return () => {
      stop();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onReducedChange);
    };
  }, []);

  return null;
}
