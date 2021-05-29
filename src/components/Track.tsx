import TrackType from "../types/Track";

interface TrackProps {
  track: TrackType;
}

export default function Track({ track }: TrackProps) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img
        src={track.album.images[0].url}
        alt="Album Cover"
        height={200}
        width={200}
      />
      <p>
        {track.name} &bull; {track.artists[0].name}
      </p>
    </div>
  );
}
