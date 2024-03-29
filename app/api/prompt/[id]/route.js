import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'

// GET (Read)
export const GET = async(request, {params })=>{
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate
        ('creator');

        if(!prompt) return new Response("Prompt not found", {status:404})

        return new Response(JSON.stringify(prompts),{status: 200})
    } catch (error) {
        return new Response("Failed to fetch all prompts",{status: 500})
    }
}

// PATCH (update)
export const PATCH =async(request, {params })=>{
    const {prompt, tag} =await request.json(); 
    try {
        await connectToDB();
        
        const existingPrompt = await Prompt.findById
        (params.id);

        if(!existingPrompt) return new Response("Prompt not found", {status:404})
        
        existingPrompt.prompt =prompt;
        existingPrompt.tag=tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt, {status:200}));


    } catch (error) {
        return new Response("Failed to update the prompt",{status: 500})
    
    }
}

//DELETE (delete)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        console.log(params)
        //await Prompt.findByIdAndRemove("65a6ff4d8d00e23f7af61b99"); findByIdAndRemove deprecated了cnmd
         // Find the prompt by ID and remove it
         await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response("Error deleting prompt", { status: 500 });
    }
};