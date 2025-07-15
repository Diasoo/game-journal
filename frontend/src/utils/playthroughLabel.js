export default function playthroughLabel (input) {
    const playthroughOptions = [
        { value: "story", label: "Story" },
        { value: "story_side", label: "Story + Side Quests" },
        { value: "completionist", label: "Completionist" },
    ];
    return playthroughOptions[input]
}