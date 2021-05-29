import React, { useState, useEffect } from "react";
import { Grommet, Text, TextInput } from "grommet";
import TrackGrid from "./components/TrackGrid";
import Header from "./components/Header";
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
  const [token, setToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    fetch("/authenticate")
      .then((res) => res.text())
      .then((res) => setToken(res));
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (searchTerm === "") {
      return;
    }

    let res = await fetch(
      `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());
    // res = await res.json();

    setTracks(res.tracks.items);
  };

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
        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
          <TextInput
            placeholder="Song Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: 300 }}
          />
        </form>
        <Tracks tracks={tracks} />
      </div>
    </Grommet>
  );
}

interface TracksProps {
  tracks: TrackType[] | null;
}

const Tracks = ({ tracks }: TracksProps) => {
  if (!tracks) return null;

  if (tracks.length === 0) return <Text>No tracks match that term!</Text>;

  return <TrackGrid tracks={tracks} />;
};

export default App;
