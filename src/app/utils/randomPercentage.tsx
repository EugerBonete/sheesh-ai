export function getRandomPercentage(): string {
  const percentages: string[] = ["80%", "90%", "100%"];
  const randomIndex: number = Math.floor(Math.random() * percentages.length);
  return percentages[randomIndex];
}
