
import os
import shutil

base_path = r"c:\Users\hassa\Documents\HassanYassin\Port26\Projects"

# Define mappings (Old Name -> New Lowercase Name)
mappings = {
    "EcoVision": "ecovision",
    "EatInSight": "eatinsight",
    "Path2hire": "pathtohire",
    "Deep Learning–Based Heart Attack Risk Prediction": "heart-attack-prediction",
    "LearnBack - undergoing": "learnback"
}

if os.path.exists(base_path):
    for old_name, new_name in mappings.items():
        old_full = os.path.join(base_path, old_name)
        new_full = os.path.join(base_path, new_name)
        temp_full = os.path.join(base_path, new_name + "_temp")
        
        if os.path.exists(old_full):
            try:
                # Rename to temp first to avoid case-insensitivity clashes (though names are diff here)
                os.rename(old_full, temp_full)
                os.rename(temp_full, new_full)
                print(f"Renamed: {old_name} -> {new_name}")
            except Exception as e:
                print(f"Error renaming {old_name}: {e}")
        else:
             # Check if already renamed
             if os.path.exists(new_full):
                 print(f"Already renamed: {new_name}")
             else:
                 print(f"Not found: {old_name}")

    # Finally try to rename the parent folder Projects -> projects
    # This might fail if locked, but worth a shot
    parent_dir = os.path.dirname(base_path)
    new_base = os.path.join(parent_dir, "projects")
    temp_base = os.path.join(parent_dir, "projects_root_temp")
    
    if base_path != new_base: # If case differs
        try:
            os.rename(base_path, temp_base)
            os.rename(temp_base, new_base)
            print("Renamed root: Projects -> projects")
        except Exception as e:
            print(f"Error renaming Projects root: {e}")
else:
    print("Projects folder not found (maybe already renamed?)")
