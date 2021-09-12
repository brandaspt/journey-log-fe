import { Icon } from "leaflet"

export const createIcon = (url: string) =>
  new Icon({
    iconUrl: url,
    iconSize: [38, 96],
    iconAnchor: [19, 72],
  })
