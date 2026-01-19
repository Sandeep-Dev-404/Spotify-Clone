#!/usr/bin/env python3
import json
import urllib.parse

# Archive.org item ID
ARCHIVE_ITEM_ID = "non-stop-party-jukebox-2024"
BASE_URL = f"https://archive.org/download/{ARCHIVE_ITEM_ID}"

# Read current music-data.json
with open('music-data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update all songs with Archive.org URLs
for folder in data['folders']:
    new_songs = []
    for song in folder['songs']:
        # Handle if song is already an object (shouldn't happen yet)
        if isinstance(song, dict):
            filename = song.get('file', song)
        else:
            filename = song
        
        # URL encode the filename for Archive.org
        encoded_filename = urllib.parse.quote(filename)
        url = f"{BASE_URL}/{encoded_filename}"
        
        new_songs.append({
            "file": filename,
            "url": url
        })
    
    folder['songs'] = new_songs

# Write updated music-data.json
with open('music-data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✓ music-data.json updated successfully!")
print(f"✓ All songs now point to: {BASE_URL}")
print(f"✓ Total folders: {len(data['folders'])}")
print(f"✓ Sample URL: {data['folders'][0]['songs'][0]['url']}")
