import { useState } from 'react';
import html2canvas, { Options } from 'html2canvas';

interface UseScreenShotProps {
  /**
   * @param type - Image format.
   * The standard MIME type for the image format to return.
   * If you do not specify this parameter, the default value is a PNG format image.
   * This prop is used as a parameter for HTMLCanvasElement.toDataURL method.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL}
   */
  type?: string;
  /**
   * @param quality - Image quality.
   * This prop is used as a parameter for HTMLCanvasElement.toDataURL method.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL}
   */
  quality?: number;
}

export const useScreenshot = ({ type, quality }: UseScreenShotProps) => {
  const [image, setImage] = useState<string | null>(null);
  /**
   * convert html element to image
   * @param  element - html element to convert
   * @param  options - options for html2canvas
   */
  const takeScreenShot = (element: HTMLElement, options?: Partial<Options>) => {
    return html2canvas(element, options)
      .then((canvas) => {
        const croppedCanvas = document.createElement('canvas');
        const croppedCanvasContext = croppedCanvas.getContext('2d');
        // init data
        const cropPositionTop = 0;
        const cropPositionLeft = 0;
        const cropWidth = canvas.width;
        const cropHeight = canvas.height;

        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;

        if (croppedCanvasContext) croppedCanvasContext.drawImage(canvas, cropPositionLeft, cropPositionTop);

        const base64Image = croppedCanvas.toDataURL(type, quality);

        setImage(base64Image);
        return base64Image;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  /**
   * creates name of file
   * @param extension - file extension
   * @param  name - file name
   */
  const createFileName = (extension: string, name: string) => {
    return `${name}.${extension}`;
  };

  const downloadScreenshot = (extension: string, name: string) => {
    // create a element to attach the image as href, then click it to download the image
    const a = document.createElement('a');
    if (!image) throw new Error('Image is not available.');
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  return { takeScreenShot, downloadScreenshot };
};
