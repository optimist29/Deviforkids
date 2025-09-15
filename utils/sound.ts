
export const playSound = (soundUrl: string) => {
  try {
    const audio = new Audio(soundUrl);
    // Set volume to make the effects subtle and not startling
    audio.volume = 0.5;
    audio.play().catch(error => console.error("Error playing sound:", error));
  } catch (error) {
    console.error("Could not create or play sound:", error);
  }
};
