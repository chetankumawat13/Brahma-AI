import { ChatMistralAI } from "@langchain/mistralai"

const llm = new ChatMistralAI({
    model: "mistral-small-latest",
    temperature: 0,
    maxRetries: 2,
    // other params...
})

export async function testAi(){
    llm.invoke("ok i can understand your thing you dont have live data so how i can access the live through you")
    .then((response) => {
        console.log(response.text);
    })
}