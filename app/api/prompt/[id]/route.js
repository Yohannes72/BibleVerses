import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async(request, context) => {
    try {
        await connectToDB();

        const { id } = await context.params; // Await params
        const prompt = await Prompt.findById(id).populate("creator");

        if (!prompt) {
            return new Response("Prompt Not Found", { status: 404 });
        }

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.error("Error fetching prompt:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};

export const PATCH = async(request, context) => {
    try {
        await connectToDB();

        const { id } = await context.params; // Await params
        const { prompt, tag } = await request.json();

        const existingPrompt = await Prompt.findById(id);
        if (!existingPrompt) {
            return new Response("Prompt Not Found", { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response("Prompt updated successfully", { status: 200 });
    } catch (error) {
        console.error("Error updating prompt:", error);
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async(request, context) => {
    try {
        await connectToDB();

        const { id } = await context.params; // Await params
        const deletedPrompt = await Prompt.findByIdAndDelete(id); // Use findByIdAndDelete

        if (!deletedPrompt) {
            return new Response("Prompt Not Found", { status: 404 });
        }

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting prompt:", error);
        return new Response("Error Deleting Prompt", { status: 500 });
    }
};
