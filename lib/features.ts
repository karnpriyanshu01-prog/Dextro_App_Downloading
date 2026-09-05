// Only features that actually exist in the app. Update this list if the
// app's capabilities change — never add anything aspirational here.
export type Feature = { title: string; description: string }

export const features: Feature[] = [
  {
    title: 'Live Sports Channels',
    description: 'Watch live sports channels directly inside the app with a single tap.',
  },
  {
    title: 'Modern Video Player',
    description: 'A custom player built for streaming — clean controls, quick response, minimal clutter.',
  },
  {
    title: 'Fullscreen Playback',
    description: 'Switch to fullscreen for an immersive, edge-to-edge viewing experience.',
  },
  {
    title: 'Picture-in-Picture',
    description: 'Keep a stream playing in a floating window while you use other apps.',
  },
  {
    title: 'Aspect Ratio Control',
    description: 'Cycle between fit, fill, and crop modes to match the video to your screen.',
  },
  {
    title: '10-Second Skip',
    description: 'Jump forward or back 10 seconds on on-demand content with one tap.',
  },
  {
    title: 'Screen Lock',
    description: 'Lock the player controls during playback to avoid accidental taps.',
  },
  {
    title: 'Dark Premium UI',
    description: 'A black-and-red interface designed to keep the focus on the stream.',
  },
  {
    title: 'Lightweight App',
    description: 'A small install size and low resource use, built to run smoothly on most Android devices.',
  },
]
