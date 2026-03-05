from pathlib import Path
import json
import random

def random_color():
    return "#{:06x}".format(random.randint(0, 0xFFFFFF))

def change_data():
    for file in Path(".").glob("*.json"):
        if file.stem.endswith("_complete"):
            continue
        print(f"processing {file.name}")
    
        with open(file, "r") as f:
            data = json.load(f)
    
        coords = data["features"][0]["geometry"]["coordinates"]
    
        name = file.stem
        color = random_color()
    
        new_geojson = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "id": name,
                        "name": name.replace("_", " "),
                        "color":color
                    },
                    "geometry":{
                        "type": "LineString",
                        "coordinates": coords
                    }
                }
            ]
        }
    
        with open(file, "w") as f:
            json.dump(new_geojson, f, indent=2)
    
        new_name = file.with_name(file.stem +"_complete.json")
        file.rename(new_name)
    
        print(f"\nFinished {new_name.name}\n")
    
    print("All files processed. ")


def update_main():
    main_file = Path("..")/"MapData.json"
    map_folder = Path(".")
    
    with open (main_file, "r") as f:
        main_data = json.load(f)
        
    for file in map_folder.glob("*complete.json"):
        with open (file, "r") as f:
            new_data = json.load(f)
        main_data["features"].extend(new_data["features"])
        folder_name = file.stem.split("_")[0]
        destination = Path(f"./{folder_name}")
        destination.mkdir(exist_ok=True)
    
        file.rename(destination / file.name)
    
    with open(main_file, "w") as f:
        json.dump(main_data, f, indent=2)

    print("\nFile has succesfully been appended\n")

if __name__ == "__main__":
    while True:
        print("\n*******\n\t1.Normalise data\n\t2.Update main file \n\t3.Exit")
        option = (input("Pick an option: "))
        if option == "1":
            change_data()

        elif option =="2":
            update_main()
        elif option =="3":
            break
        else:
            print("invalid option")

