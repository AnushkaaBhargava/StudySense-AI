import { chunkText } from "./chunkText.js";

export function createChunks(text) {

    const chunkArray = chunkText(text);

    const chunks = chunkArray.map((chunk, index) => {

        return {
            chunkId: index + 1,
            text: chunk
        };

    });

    return chunks;
}