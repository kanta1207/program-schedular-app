import html2canvas, { Options } from 'html2canvas';

export const useScreenshot = () => {
  /**
   * creates name of file
   * @param  name - file name
   */
  const createFileName = (name: string) => {
    return `${name}.png`;
  };

  /**
   * convert html element to image
   * @param  element - html element to convert
   * @param  name - name of the file
   * @param  options - options for html2canvas
   */
  const takeScreenshot = (element: HTMLElement, name: string, options?: Partial<Options>) => {
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

        const base64Image = croppedCanvas.toDataURL();

        // create a element to attach the image as href, then click it to download the image
        const a = document.createElement('a');
        if (!base64Image) throw new Error('Image is not available.');
        a.href = base64Image;
        a.download = createFileName(name);
        a.click();
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return { takeScreenshot };
};
