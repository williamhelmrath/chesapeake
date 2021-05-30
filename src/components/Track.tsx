import { useState } from "react";
import { Button } from "grommet";
import TrackType from "../types/Track";

interface TrackProps {
  track: TrackType;
}

export default function Track({ track }: TrackProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 10,
        textAlign: "center",
      }}
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
      <Button
        label={clicked ? <>&#10003;</> : "Add"}
        primary
        disabled={clicked}
        onClick={handleClick}
      />
    </div>
  );
}
