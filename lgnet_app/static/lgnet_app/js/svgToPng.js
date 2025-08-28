export default async function svgToPng(svg) {
  const img = new Image();
  const svgBlob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);

  return new Promise((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");
      URL.revokeObjectURL(url);
      resolve(pngUrl);
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };

    img.src = url;
  });
}
