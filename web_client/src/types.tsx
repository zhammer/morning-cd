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