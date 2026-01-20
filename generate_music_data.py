#!/usr/bin/env python3
import json
import urllib.parse

# Backblaze B2 bucket details
BUCKET_NAME = "github-music-sandeep-dev-404"
REGION = "s3.us-east-005"
BASE_URL = f"https://{BUCKET_NAME}.{REGION}.backblazeb2.com"

# Read current music-data.json
with open('music-data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update all songs with Backblaze B2 URLs
for folder in data['folders']:
    new_songs = []
    for song in folder['songs']:
        # Handle if song is already an object
        if isinstance(song, dict):
            filename = song.get('file', song)
        else:
            filename = song
        
        # URL encode the filename for Backblaze B2
        encoded_filename = urllib.parse.quote(filename, safe='')
        # Backblaze B2 URL
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
print(f"✓ All songs now point to Backblaze B2: {BASE_URL}")
print(f"✓ Total folders: {len(data['folders'])}")
print(f"✓ Sample URL: {data['folders'][0]['songs'][0]['url']}")

