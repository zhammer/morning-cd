export interface Image {
  url: string;
}

export interface Song {
  id: string;
  name: string;
  artist: string;
  album: string;
  images: {
    small: Image;
    medium: Image;
    large: Image;
  }
}

export interface Listen {
  id: string;
  listenerName: string;
  listenTimeUtc: Date; // this should not be called UTC.
  note?: string;
  ianaTimezone: string;
  song: Song;
}

export interface SunlightWindow {
  sunrise: Date;
  sunset: Date;
}

export interface SunlightWindows {
  yesterday: SunlightWindow;
  today: SunlightWindow;
  tomorrow: SunlightWindow;
}