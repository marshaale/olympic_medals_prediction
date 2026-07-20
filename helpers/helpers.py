def season_encode(season: str) -> int:
    """Encode Olympic season.

    Returns:
        1 for Summer
        0 for Winter

    Raises:
        ValueError: if season is not "summer" or "winter".
    """
    labels = {
        "summer": 1,
        "winter": 0,
    }

    key = season.strip().lower()

    if key not in labels:
        raise ValueError(
            f"Invalid season '{season}'. Expected 'summer' or 'winter'."
        )

    return labels[key]

def classification_result_decoder(result: int) -> str:
    """
    Decode the predicted NOC cluster.

    Clusters:
        0 -> Emerging Nation (Low medal potential)
        1 -> Competitive Nation (Moderate medal potential)
        2 -> Elite Nation (High medal potential)
    """
    labels = {
        0: "Emerging Nation 🥉",
        1: "Competitive Nation 🥈",
        2: "Elite Nation 🥇",
    }

    return labels.get(result, "Unknown Classification")

if __name__ == "__main__":
    print(season_encode('winter'),season_encode('summer'))
    for i in range(0,3):
        print(f"Cluster: {i}",classification_result_decoder(i))