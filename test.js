import { generateEmbeddings} from "./services/embeddingService.js";

const embedding = await generateEmbeddings("Operating Systems");

console.log(embedding.length);
console.log(embedding.slice(0, 10));