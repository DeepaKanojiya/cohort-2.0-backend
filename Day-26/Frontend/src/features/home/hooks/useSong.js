import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSong } from "../services/song.api";

export function useSong() {
  const context = useContext(SongContext);

  if (!context) {
    throw new Error("useSong must be used within SongContextProvider");
  }

  const { loading, setLoading, song, setSong } = context;

  const handleGetSong = async ({ mood }) => {
    setLoading(true);
    try {
      const data = await getSong({ mood });
      if (!data.song) {
        throw new Error(`No song is available for the ${mood} mood.`);
      }
      setSong(data.song);
    } finally {
      setLoading(false);
    }
  };


  return {
    loading,
    song,
    handleGetSong
  }
}
