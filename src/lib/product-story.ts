/** Presentation-only transforms. Confirmed mesh geometry and materials stay intact. */
export const STORY_DURATION = 10.8;
export const STORY_STEPS = [
  { label: 'Spin', time: 1.35 },
  { label: 'Open', time: 4.15 },
  { label: 'Fill', time: 7.2 },
  { label: 'Close', time: STORY_DURATION },
] as const;
export const clamp = (x: number) => Math.max(0, Math.min(1, x));
export const smooth = (x: number) => { const v = clamp(x); return v * v * (3 - 2 * v); };
export function storyPose(time: number) {
  const t = Math.max(0, Math.min(STORY_DURATION, time));
  return {
    rotation: Math.PI * 2 * smooth(t / 2.5),
    open: smooth((t - 2.5) / 1.55) * (1 - smooth((t - 9) / 1.8)),
    stage: t < 2.5 ? 0 : t < 4.2 ? 1 : t < 9 ? 2 : 3,
  };
}
export function foodProgress(time: number, index: number, total: number) {
  // Lower pieces arrive first, so food builds up from the container's base.
  return clamp((time - 4.2 - index / Math.max(1, total - 1) * 3.1) / .85);
}
