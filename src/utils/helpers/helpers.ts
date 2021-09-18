import { IGeocodingResponse } from "../../types/geocoding"
import heic2any from "heic2any"
import { IPostPhotosArray } from "../../types/newPost"

export const getAddressFromCoords = async (lat: number, long: number) => {
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env
      .REACT_APP_GOOGLE_GEOCODING_API_KEY!}&result_type=country|administrative_area_level_1|administrative_area_level_2`
  )
  const body: IGeocodingResponse = await resp.json()
  console.log(body.results[0])

  const address = { level2: "", level1: "", country: "" }

  if (body.results.length > 0) {
    body.results[0].address_components.forEach(comp => {
      if (comp.types.includes("administrative_area_level_2")) address.level2 = comp.long_name
      if (comp.types.includes("administrative_area_level_1")) address.level1 = comp.long_name
      if (comp.types.includes("country")) address.country = comp.long_name
    })
  }

  return address
}

export const createBlobURLs = async (files: FileList) => {
  const urlArr: IPostPhotosArray = []

  for (let i = 0; i < files.length; i++) {
    if (files[i].type.includes("heic")) {
      const jpeg = await heic2any({ blob: files[i], toType: "image/jpeg" })
      urlArr.push({
        photoFile: files[i],
        blobURL: URL.createObjectURL(jpeg),
      })
    } else
      urlArr.push({
        photoFile: files[i],
        blobURL: URL.createObjectURL(files[i]),
      })
  }
  return urlArr
}
