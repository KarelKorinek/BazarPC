
/**
 * 
 *  The function for convesion from base64 format to Blob format
 * 
 * @param {*} base64Data        Base64 format data to be converted to Blob format
 * @param {*} contentType       Base64 content type
 * @returns                     return data in Blob format
 */
function base64ToBlob(base64Data, contentType = 'image/png') {

    // convert from base64 to ASCII
    const byteCharacters = atob(base64Data); 
    const byteArrays = [];

    // Convert Base64 to bytes array
    for (let offset = 0; offset < byteCharacters.length; offset++) {
        byteArrays.push(byteCharacters.charCodeAt(offset));
    }

    // Create Blob from bytes array
    const blob = new Blob([new Uint8Array(byteArrays)], { type: contentType });
    return blob;
}

/**
 * 
 *  The function for conversion from base64 format to File
 * 
 * @param {*} base64Data        Base64 format data
 * @param {*} filename          file name
 * @returns                     return data in File object format
 */
export function base64ToFile(base64Data, filename = 'image.png') {

        const blob = base64ToBlob(base64Data);
        const file = new File([blob], filename, { type: blob.type });
        return file;
    }