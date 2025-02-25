import OpenAI from "openai"
import {z} from "zod"
import { zodResponseFormat } from "openai/helpers/zod.mjs";

const titleSchema = z.object({
    description: z.string(),
    tags: z.array(z.string()),
    summary: z.string(),
    keywords: z.array(z.string()),
})

const openai = new OpenAI({
  apiKey: "xai-cBKJmhKRD0i8sHKJZGuwAZ830yvag12Cws66KJsiJlUaaqmKR5jfZTgc6YfOu2Ko36YKibCFQW2NsIhr",
  baseURL: "https://api.x.ai/v1"

});

export async function generateArticleMetadata(articleContent: string) {
    const response = await openai.beta.chat.completions.parse({
        model:"grok-2-latest",
        messages:[
            {
                role: "system",
                content: "你是一个专业的文章编辑，请为以下文章内容生成标题、描述、标签、关键词、内容总结，启动标题描述关键词需要符合seo标准，内容总结需要简要明确指出问题和解决方案"
            },
            {
                role: "user",
                content: articleContent
            }
        ],
        response_format: zodResponseFormat(titleSchema, "event")
    })
    return response.choices[0].message.parsed
}




