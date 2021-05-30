import { useState, useEffect } from "react";
import { Grommet, Text } from "grommet";
import TrackGrid from "./components/TrackGrid";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TrackType from "./types/Track";
import "./App.css";

const theme = {
  global: {
    colors: { brand: "#1DB954" },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

function App() {
  const [token, setToken] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tracks, setTracks] = useState<TrackType[] | null>(null);

  useEffect(() => {
    fetch("/authenticate")
      .then((res) => res.text())
      .then((res) => setToken(res));
  }, []);

  return (
    <Grommet theme={theme}>
      <Header />
      <div
        style={{
          padding: 30,
          maxWidth: 1100,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          token={token}
          setTracks={setTracks}
        />
        <Tracks tracks={tracks} />
      </div>
    </Grommet>
  );
}

interface TracksProps {
  tracks: TrackType[] | null;
}

const Tracks = ({ tracks }: TracksProps) => {
  if (!tracks) return <Text>Your tracks will appear here!</Text>;

  if (tracks.length === 0) return <Text>No tracks match that term!</Text>;

  return <TrackGrid tracks={tracks} />;
};

export default App;
