function ViewCurriculumPdf(curriculum) {
        // Retrieving filename and filedata
        const index = curriculum.indexOf(',');
        const viewFileData = curriculum.slice(index+30);
        // Decode the base64 string to binary data
        var binaryData = atob(viewFileData);
        // Create a Uint8Array from the binary data
        var byteArray = new Uint8Array(binaryData.length);
        for (var i = 0; i < binaryData.length; i++) {
            byteArray[i] = binaryData.charCodeAt(i) & 0xff;
        }
        var blob = new Blob([byteArray], {type: "application/pdf"});
        //Build a URL from the file
        const fileURL = URL.createObjectURL(blob);
        //Open the URL on new Window
        window.open(fileURL); 
        return null;
    }

export default ViewCurriculumPdf;