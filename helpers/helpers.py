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
        raise ValueError(f"Invalid season '{season}'. Expected 'summer' or 'winter'.")

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


def iqr_fun(series,k=3)->tuple[float,float]:
    q1, q3 = series.quantile([0.25, 0.75])
    iqr = q3 - q1
    lower = q1 - k * iqr
    upper = q3 + k * iqr
    return lower,upper