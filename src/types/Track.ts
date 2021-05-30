interface Track {
  name: string;
  artists: Artist[];
  explicit: true;
  album: Album;
  id: string;
}

interface Artist {
  name: string;
}

interface Album {
  images: Image[];
}

interface Image {
  height: number;
  width: number;
  url: string;
}

export default Track;
