def season_encode(season:str)->int:
    # 'Summer':1 'Winter':0
    if season.lower() == 'summer':
        return 1
    return 0


if __name__ == "__main__":
    print(season_encode('winter'),season_encode('summer'))