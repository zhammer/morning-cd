export interface SunlightWindow {
  sunrise: Date;
  sunset: Date;
}

export interface SunlightWindows {
  yesterday: SunlightWindow;
  today: SunlightWindow;
  tomorrow: SunlightWindow;
}

export interface Sundial {
  calibrating: boolean;
  isDay: boolean;
  lastSunrise: Date;
}

export interface SundialEventCallbacks {
  onSunrise?: () => void;
  onSunset?: () => void;
  onNewDay?: () => void;
  onCalibrateToDay?: () => void;
  onCalibrateToNight?: () => void;
}

export enum TimeOfDay {
  BeforeSunrise = 'BEFORE_SUNRISE',
  Day = 'DAY',
  AfterSunset = 'AFTER_SUNSET'
}

export type FetchSunlightWindows = (today: Date) => Promise<SunlightWindows>;