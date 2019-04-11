import { Camera, CameraOptions } from '@ionic-native/camera/ngx'

export class CameraMgr {
  constructor(public camera: Camera) {

  }

  getPicture() {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
    }

    return this.camera.getPicture(options).then((img) => {
      return img;
    });
  }
  takePhoto() {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true
    }
    return this.camera.getPicture(options).then((img) => {
      return img;
    });
  }
}
