import { PlayerContext } from "@/contexts/playerbar/playerContext";
import { useContext } from "react"

const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (context === undefined) {
        throw new Error("usePlayer must be used within a PlayerProvider");
    }
    return context;
}
export default usePlayer;