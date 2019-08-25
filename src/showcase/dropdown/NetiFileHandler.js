import { BaseURIHolder } from './BaseURIHolder';
import UnAuthService from '../auth/UnAuthService';

export class NetiFileHandler {
    constructor() {
        this.baseURIHolder = new BaseURIHolder();
        this.unAuth = new UnAuthService();
    }

    getByteImage(filePath) {
        var uri = this.baseURIHolder.getGuestFile() + '/find?filePath=' + filePath;
        return this.unAuth.getFetch(uri);
    }

    getImageExtention(contentType) {
        if (contentType === undefined) {
            return;
        }
        let extention = '';
        if (contentType === 'image/jpeg') {
            extention = '.jpeg';
        } else if (contentType === 'image/jpg') {
            extention = '.jpg';
        } else if (contentType === 'image/png') {
            extention = '.png';
        } else if (contentType === 'application/pdf') {
            extention = '.pdf';
        }
        return extention;
    }

    getImageContentType(fileName) {
        if (fileName === undefined) {
            return;
        }
        let contentType = '';
        if (fileName.endsWith('.jpeg')) {
            contentType = 'image/jpeg';
        } else if (fileName.endsWith('.jpg')) {
            contentType = 'image/jpg';
        } else if (fileName.endsWith('.png')) {
            contentType = 'image/png';
        } else if (fileName.endsWith('.pdf')) {
            contentType = 'application/pdf';
        }
        return 'data:' + contentType + ';base64,';
    }

    getFileContentType(fileName) {
        if (fileName === undefined) {
            return;
        }
        let contentType = '';
        if (fileName.endsWith('.jpeg')) {
            contentType = 'image/jpeg';
        } else if (fileName.endsWith('.jpg')) {
            contentType = 'image/jpg';
        } else if (fileName.endsWith('.png')) {
            contentType = 'image/png';
        } else if (fileName.endsWith('.pdf')) {
            contentType = 'application/pdf';
        }
        return contentType;
    }

    getResizeByteImage(realContent, fileName, width, height) {
        let output = '';
        if (realContent === undefined || realContent==null) {
            return;
        }
        if (fileName === undefined || fileName==null) {
            return;
        }
        let contentType = this.getImageContentType(fileName);
        width = width ? width : 150;
        height = height ? height : 150;
        let fileType = this.getFileContentType(fileName);
        return new Promise(function (resolve, reject) {
            try {
                let img = new Image();
                img.src = contentType + realContent;
                img.onload = () => {
                    if (img.height > img.width) {
                        width = Math.floor(height * (img.width / img.height));
                    }
                    else {
                        height = Math.floor(width * (img.height / img.width));
                    }

                    let resizingCanvas = document.createElement('canvas');
                    let resizingCanvasContext = resizingCanvas.getContext("2d");
                    resizingCanvas.width = img.width;
                    resizingCanvas.height = img.height;
                    resizingCanvasContext.drawImage(img, 0, 0, resizingCanvas.width, resizingCanvas.height);

                    let curImageDimensions = {
                        width: Math.floor(img.width),
                        height: Math.floor(img.height)
                    };

                    let halfImageDimensions = {
                        width: null,
                        height: null
                    };

                    // Quickly reduce the dize by 50% each time in few iterations until the size is less then
                    // 2x time the target size - the motivation for it, is to reduce the aliasing that would have been
                    // created with direct reduction of very big image to small image
                    while (curImageDimensions.width * 0.5 > width) {
                        // Reduce the resizing canvas by half and refresh the image
                        halfImageDimensions.width = Math.floor(curImageDimensions.width * 0.5);
                        halfImageDimensions.height = Math.floor(curImageDimensions.height * 0.5);

                        resizingCanvasContext.drawImage(resizingCanvas, 0, 0, curImageDimensions.width, curImageDimensions.height,
                            0, 0, halfImageDimensions.width, halfImageDimensions.height);

                        curImageDimensions.width = halfImageDimensions.width;
                        curImageDimensions.height = halfImageDimensions.height;
                    }

                    // Now do final resize for the resizingCanvas to meet the dimension requirments
                    // directly to the output canvas, that will output the final image
                    let outputCanvas = document.createElement('canvas');
                    let outputCanvasContext = outputCanvas.getContext("2d");

                    outputCanvas.width = width;
                    outputCanvas.height = height;

                    outputCanvasContext.drawImage(resizingCanvas, 0, 0, curImageDimensions.width, curImageDimensions.height,
                        0, 0, width, height);

                    // output the canvas pixels as an image. params: format, quality
                    output = outputCanvas.toDataURL(fileType, 0.85);
                    resolve(output);
                };
            } catch (e) {
                reject(e);
            }

        })

    }

}