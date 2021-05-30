import { Dispatch, KeyboardEvent, SetStateAction, useRef } from "react";
import { TextInput } from "grommet";
import TrackType from "../types/Track";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  token: string;
  setTracks: Dispatch<SetStateAction<TrackType[] | null>>;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  token,
  setTracks,
}: SearchBarProps) {
  const inputEl = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Enter") inputEl.current?.blur();
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (searchTerm === "") {
      return;
    }

    setTracks(null);

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

    setTracks(res.tracks.items);
  };

  return (
    <TextInput
      ref={inputEl}
      placeholder="Song Name"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleSubmit}
      style={{ maxWidth: 300, marginBottom: 20 }}
    />
  );
}
