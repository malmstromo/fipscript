# fipscript
fetches track info from fip pop API (https://www.radiofrance.fr/api/v2.0/stations/fip/webradios/fip_pop) and adds it to a spotify playlist

## prerequisites

### spotify client secret and id
create an app in your spotify developer console - https://developer.spotify.com/dashboard/applications
add the client secret and id to a .env file in the project root under CLIENT_ID and CLIENT_SECRET

### spotify refresh token
get your access and refresh token. this guy does it quite easily https://benwiz.com/blog/create-spotify-refresh-token/
add it to the .env file under REFRESH_TOKEN

### playlist id
add the id of the target playlist. the id can be found by in the uri by 

1. right clicking the playlist
2. share
3. press alt
4. copy spotify uri

add it to the .env file under PLAYLIST_ID

## run it
first run `npm install`

to run the whole thing:

>node main.js

