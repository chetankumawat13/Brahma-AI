import "dotenv/config"
import { AIMessage, HumanMessage } from "@langchain/core/messages"
import { ChatGroq } from "@langchain/groq"

const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxRetries: 0
})

function mapToLangChainMessage(msg){
    if(msg.role == "user"){
        return new HumanMessage(msg.content)
    }

    if(msg.role == "ai"){
        return new AIMessage(msg.content)
    }

    return null
}

function extractChunkText(chunk){
    if(!chunk){
        return ""
    }

    if(typeof chunk.content === "string"){
        return chunk.content
    }

    if(Array.isArray(chunk.content)){
        return chunk.content
            .map((item) => {
                if(typeof item === "string"){
                    return item
                }

                if(item && typeof item.text === "string"){
                    return item.text
                }

                return ""
            })
            .join("")
    }

    return ""
}



export async function generateResponse(messages){

    const response = await llm.invoke(
        messages
            .map(mapToLangChainMessage)
            .filter(Boolean)
    );

    return response.text
}

export async function streamResponse(messages, onToken){
    let fullResponse = ""

    const stream = await llm.stream(
        messages
            .map(mapToLangChainMessage)
            .filter(Boolean)
    )

    for await (const chunk of stream){
        const token = extractChunkText(chunk)

        if(!token){
            continue
        }

        fullResponse += token
        onToken(token)
    }

    return fullResponse
}

export function generateChatTitle(message){
    const words = message
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .slice(0, 5)

    return words.length ? words.join(" ") : "New Chat"
}

export function getAIErrorMessage(error){
    if(error?.status === 429 || error?.code === 429 || error?.error?.code === 1300){
        return "Groq is rate-limited right now. Please wait a moment and try again."
    }

    return error?.message || "The Groq AI service is unavailable. Please try again."
}