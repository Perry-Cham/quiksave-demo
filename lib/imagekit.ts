import { ImageKit } from "@imagekit/nodejs";

class ImageKitHandler {
    imagekit: ImageKit | null = null;
    retries: number = 5;
    init() {
        const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
        if (!privateKey) {
            throw new Error("IMAGEKIT_PRIVATE_KEY environment variable is not defined");
        }
        if (!this.imagekit) {
            this.imagekit = new ImageKit({
                privateKey: privateKey,
            });
        } else {
            return;
        }
    }

    async upload(file: File, fileName: string, category: string) {
        this.init();
        // Convert the buffer to base64
        let fileString = await convertFileToBase64(file);

        if (fileString) {
            const uploadResponse = await this.imagekit!.files.upload({
                file: fileString,
                fileName: `${fileName}-${Date.now()}`,
                folder: `/Quicksave/product_images/${category}`,
            });
            return uploadResponse;
        } else {
            //Assuming an edgecase where base 64 conversion fails for whatever reason retry twice.
            let currentRetries = 0;
            while ((currentRetries < 2 + 1) || !fileString) {
                fileString = await convertFileToBase64(file);
                currentRetries++;
            }
            if (!fileString) return;

            //Then aftwards try uploading the file if it fails retry according to the number of retries before giving up
            let uploadResponse: ImageKit.Files.FileUploadResponse | null = null;
            try {
                uploadResponse = await this.imagekit!.files.upload({
                    file: fileString,
                    fileName: `${fileName}-${Date.now()}`,
                    folder: `/Quicksave/product_images/${category}`,
                });
            } catch (e) {
                console.log(e);
                while ((currentRetries < this.retries + 1) || !uploadResponse) {
                    uploadResponse = await this.imagekit!.files.upload({
                        file: fileString,
                        fileName: `${fileName}-${Date.now()}`,
                        folder: `/Quicksave/product_images/${category}`,
                    });
                }
            }
            if (uploadResponse) {
                return uploadResponse;
            }

        }
    }

    async delete(imageId: string) {
        this.init();
        const deleteResponse = await this.imagekit!.files.delete(imageId);
        return deleteResponse;
    }
}

async function convertFileToBase64(file: File) {
    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64String = buffer.toString("base64");
        return base64String;
    } catch (error) {
        console.error("Error converting file to base64:", error);
    }

}

const imageKitHandler = new ImageKitHandler();
export { imageKitHandler };