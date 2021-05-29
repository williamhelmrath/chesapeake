import React, { useState, useEffect } from "react";
import { Grommet, Text, TextInput } from "grommet";
import "./App.css";
import Track from "./components/Track";
import Header from "./components/Header";
import TrackType from "./types/Track";

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
    <Grommet>
      <Header />
      <div style={{ padding: 30, maxWidth: 1100, margin: "auto" }}>
        <form onSubmit={handleSubmit}>
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

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {tracks.map((track) => (
        <Track track={track} />
      ))}
    </div>
  );
};

export default App;
