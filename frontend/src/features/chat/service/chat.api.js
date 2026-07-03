import axios from 'axios'

const api = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_URL}/api`,
    withCredentials:true
})


export async function getChats(){
    const response = await api.get("chats")
    return response.data.chats
}

export async function getMessages(chatId){
    const response = await api.get(`/chats/${chatId}/messages`);
    return response.data.messages
}


export async function sendMessage(message,chatId){
    const response = await api.post('/chats/message',{
        message,
        chatId
    })

    return response.data
}

function parseSSEChunk(chunk){
    const lines = chunk.split('\n')
    let event = 'message'
    let data = ''

    for(const line of lines){
        if(line.startsWith('event:')){
            event = line.slice(6).trim()
        }

        if(line.startsWith('data:')){
            data += line.slice(5).trim()
        }
    }

    if(!data){
        return null
    }

    return {
        event,
        payload: JSON.parse(data)
    }
}

export async function sendMessageStream({ message, chatId, onMeta, onToken, onDone, onError }){
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chats/message/stream`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message, chatId })
    })

    if(!response.ok || !response.body){
        throw new Error('Unable to stream response')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while(true){
        const { done, value } = await reader.read()

        if(done){
            break
        }

        buffer += decoder.decode(value, { stream: true })
        const segments = buffer.split('\n\n')
        buffer = segments.pop() || ''

        for(const segment of segments){
            const parsed = parseSSEChunk(segment)

            if(!parsed){
                continue
            }

            if(parsed.event === 'meta'){
                onMeta?.(parsed.payload)
            }else if(parsed.event === 'token'){
                onToken?.(parsed.payload)
            }else if(parsed.event === 'done'){
                onDone?.(parsed.payload)
            }else if(parsed.event === 'error'){
                onError?.(parsed.payload)
            }
        }
    }

    const trailing = parseSSEChunk(buffer.trim())

    if(trailing){
        if(trailing.event === 'meta'){
            onMeta?.(trailing.payload)
        }else if(trailing.event === 'token'){
            onToken?.(trailing.payload)
        }else if(trailing.event === 'done'){
            onDone?.(trailing.payload)
        }else if(trailing.event === 'error'){
            onError?.(trailing.payload)
        }
    }
}


