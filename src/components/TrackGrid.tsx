import { useContext } from "react";
import { ResponsiveContext } from "grommet";
import Track from "./Track";
import TrackType from "../types/Track";

interface TracksProps {
  tracks: TrackType[];
}

const DesktopContent = ({ tracks }: TracksProps) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      maxWidth: "1400px",
    }}
  >
    {tracks.map((track) => (
      <Track track={track} key={track.id} />
    ))}
  </div>
);

const MobileContent = ({ tracks }: TracksProps) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    {tracks.map((track: TrackType) => (
      <Track track={track} key={track.id} />
    ))}
  </div>
);

export default function TrackGrid({ tracks }: TracksProps) {
  const size = useContext(ResponsiveContext);
  return size === "small" ? (
    <MobileContent tracks={tracks} />
  ) : (
    <DesktopContent tracks={tracks} />
  );
}
