export const DownloadExeclFile = (response: any, outputFilename: string) => {
  const url = URL.createObjectURL(new Blob([response]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', outputFilename);
  document.body.appendChild(link);
  link.click();

  link.parentNode?.removeChild(link);
}
export const DownloadFilePNG = (base64Data: string, outputFilename: string) => {
  try {
    // Convert base64 data to a Blob
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
    const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/png' });

    // Create a blob URL and download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', outputFilename);

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error while downloading file:', error);
  }
};
export const DownloadFileJPG = (base64Data: string, outputFilename: string) => {
  try {
    // Convert base64 data to a Blob
    const byteCharacters: any = atob(base64Data);
    const byteArrays = [];
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
    const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/jpg' });

    // Create a blob URL and download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', outputFilename);

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error while downloading file:', error);
  }
};
export const DownloadFileJPEG = (base64Data: string, outputFilename: string) => {
  try {
    // Convert base64 data to a Blob
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
    const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/jpg' });

    // Create a blob URL and download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', outputFilename);

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error while downloading file:', error);
  }
};
export const DownloadFilePDF = (base64Data: string, outputFilename: string) => {
  try {
    // Convert base64 data to a Blob
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
    const blob = new Blob([new Uint8Array(byteArrays)], { type: 'application/pdf' });

    // Create a blob URL and download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', outputFilename);

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error while downloading PDF:', error);
  }
};
export const DownloadExcelBase64File = (base64Data: string, outputFilename: string) => {
  const binaryData = atob(base64Data);
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const uintArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryData.length; i++) {
    uintArray[i] = binaryData.charCodeAt(i);
  }
  const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = outputFilename;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}