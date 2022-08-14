# online drawing app!!!

Die Bois presents Lets Draw Dude!

An online multiplayer drawing website hosted under https://letsdrawdu.de/

![Example](https://user-images.githubusercontent.com/103064414/184151367-0c9c668e-683b-4ea9-bea2-409599bb098a.PNG)


This project was created during the university course "Web Technology" at the "FOM Düsseldorf".


## Features

- Drawing!
- Multiplayer!
- Shop!
- Great Code!
- Chat!

![CodeEx](https://user-images.githubusercontent.com/103064414/184151779-328043e6-ccd1-44f7-aa55-463e80053664.PNG)

- And more...

## Installation

An account on [twilio.com](https://www.twilio.com) is necessary to use this app!
- Create an account on twilio
- use git to checkout this project
- insert your twilio and Django keys/secrets
- build the image with `docker-compose build`
- run the image with `docker-compose up` (-d to detach if everything works like expected)

## Example docker-compose.yml
```yaml
version: "3.7"
services:
  onlinedrawingapp:
    build: .
    container_name: onlinedrawingapp
    networks:
      - extern
    environment:
      - DJANGO_SECRET_KEY=heregoesthesecretkey!!!
      - DJANGO_DEBUG_MODE=False
      - DJANGO_ALLOWED_HOSTS=letsdrawdu.de
      - DJANGO_LANGUAGE_CODE=de-de
      - DJANGO_TIME_ZONE=Europe/Berlin
      - TWILIO_ACCOUNT_SID=twiliosecrets
      - TWILIO_AUTH_TOKEN=twiliosecrets
      - TWILIO_SYNC_SERVICE_SID=twiliosecrets
      - TWILIO_API_KEY=twiliosecrets
      - TWILIO_API_SECRET=twiliosecrets
      - LETSENCRYPT_HOST=letsdrawdu.de
      - LETSENCRYPT_EMAIL=webmaster@letsdrawdu.de
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.ldd.entrypoints=http"
      - "traefik.http.routers.ldd.rule=Host(`letsdrawdu.de`)"
      - "traefik.http.middlewares.ldd-https-redirect.redirectscheme.scheme=https"
      - "traefik.http.routers.ldd.middlewares=ldd-https-redirect"
      - "traefik.http.routers.ldd-secure.entrypoints=https"
      - "traefik.http.routers.ldd-secure.rule=Host(`letsdrawdu.de`)"
      - "traefik.http.routers.ldd-secure.tls=true"
      - "traefik.http.routers.ldd-secure.tls.certresolver=http"
      - "traefik.http.routers.ldd-secure.service=ldd"
      - "traefik.http.services.ldd.loadbalancer.server.port=8000"
      - "traefik.docker.network=extern"
    expose:
      - "8000"

networks:
  extern:
    external: true
```

## Used Tools

- Django
- Twilio
- Docker
- Paint
- Visual Studio Code
- And others...


## How To


Click on the Draw button on either the index page or the Navbar.

Multiplayer is automatically enabled!

Drawing will be on small line width, black colour by default.

Click on erase to erase parts drawn previously. You can still change the line width here!

Click back on draw to continue to draw. It even saves your previous line settings!

The S, M, L, XL buttons are to select your line width.

The color button opens a color picker where you can select the color you draw with.

The clear board button clears the board entirely. Please note that this feature intentionally only works locally and does not clear the screens of other participants, only your own!

Use the Chatbox on the right to Chat with your dudes!

Due to technical limitations, screen is also cleared on resize, please keep that in mind!

Full Support for Mobile, Tablet and PC with great responsive design!

Have fun drawing, dudes!


## Team

Die Bois consists of:

Kai Elsner

Luis Häring

Sven Steinkühler

Tobias Danisch

Mahmoud Ftineh



### End of Readme
