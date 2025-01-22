export async function POST(request: Request) {
    const {fileName,fileContent} = await request.json()
    const buffer = Buffer.from(fileContent, 'base64');
    const params = {
        Bucket : 'myblog',
        Key : fileName,
        Body : buffer,

    }
}
   