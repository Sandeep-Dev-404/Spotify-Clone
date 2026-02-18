#!/usr/bin/env python3
import os
import json
from pathlib import Path

songs_dir = Path("./songs")
folders = []

for folder_path in sorted(songs_dir.iterdir()):
    if not folder_path.is_dir():
        continue
    
    folder_name = folder_path.name
    
    # Read info.json if it exists
    info = {"title": folder_name, "description": ""}
    info_file = folder_path / "info.json"
    if info_file.exists():
        try:
            with open(info_file, encoding='utf-8') as f:
                info = json.load(f)
        except:
            pass
    
    # Get all MP3 files
    mp3_files = sorted([f.stem for f in folder_path.glob("*.mp3")])
    
    if mp3_files:
        folders.append({
            "name": folder_name,
            "title": info.get("title", folder_name),
            "description": info.get("description", ""),
            "cover": f"songs/{folder_name}/cover.jpeg",
            "songs": mp3_files
        })
        print(f"✓ {folder_name}: {len(mp3_files)} songs")

# Create the output
output = {"folders": folders}

# Save it
with open("music-data.json", "w", encoding='utf-8') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f"\n✓ Created music-data.json with {len(folders)} folders")
