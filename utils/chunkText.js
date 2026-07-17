export function chunkText(text,chunksize=800){

    const words=text.split(/\s+/);

    const chunks=[];

    for(let i=0;i<words.length;i+=chunksize){

        const chunk=words.slice(i,i+chunksize).join(" ");
        chunks.push(chunk);
    }
    return chunks;
}