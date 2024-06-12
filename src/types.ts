export enum ScreenMode {
  countDown,
  secound,
  quiz
}

export interface TimeLeft {
  seconds: number
  hours: string
  minutes: string
  formattedSeconds: string
}