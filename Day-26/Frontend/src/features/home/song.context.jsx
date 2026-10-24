import { createContext } from "react";
import { useState } from "react";

export const SongContext = createContext();

export function SongContextProvider({ children }) {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/fzsimxftb/cohort-2/modify/songs/Calamity_BRoXFKSYX.mp3",
    posterUrl:
      "https://ik.imagekit.io/fzsimxftb/cohort-2/modify/posts/Calamity_L5yxJRbpQ.jpeg",
    title: "Calamity",
    mood: "sad",
  });

  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
      {children}
    </SongContext.Provider>
  );
}
