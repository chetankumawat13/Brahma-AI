import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"
import { ChatMistralAI } from "@langchain/mistralai"

const llm = new ChatMistralAI({
    model: "mistral-small-latest",
    temperature: 0,
    maxRetries: 2,
    // other params...
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

export async function generateChatTittle(message){
    const response = await llm.invoke([
        new SystemMessage(`You are a helpful assistant that generates concise and descriptive titles for chat conversations.
            
            User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic. `),
        new HumanMessage(`Generate a title for a chat conversation based on the following first message:
            "${message}"`)
    ])
 
    return response.text
}