import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ApiConfig } from 'src/app/api.config';


export class FileMgr {
    //var uploadapi=fileUploadAPI + "?field=img&module=" + module;
    static Upload(ft: FileTransfer,mod, filepath) {
        var fileUploadAPI=ApiConfig.getFileUploadAPI();
        var uploadapi=fileUploadAPI + "?field=img&module=" + mod;
        var options: FileUploadOptions = {
            fileKey: "img"
        };

        var ftobj = ft.create();
        return ftobj.upload(filepath, encodeURI(uploadapi), options, true).then((data) => {
            var ret=data.response.toString().split("|~~|")[1];
            return ret;
        }).then((e) => {
            alert("上传失败，请稍后重试");
        });

    }
}