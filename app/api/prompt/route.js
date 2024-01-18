import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'

//Fetch出已有的帖子

export const GET = async(request)=>{
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate
        ('creator');
        // const newPrompt =new Prompt({
        //     creator: userId, 
        //     prompt,
        //     tag
        // })

        return new Response(JSON.stringify(prompts),{status: 200})
    } catch (error) {
        return new Response("Failed to fetch all prompts",{status: 500})
    }
}
