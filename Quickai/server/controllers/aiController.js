

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import Groq from "groq-sdk";
// import sql from "../configs/db.js";
// import axios from "axios";
// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// import pdf from "pdf-parse/lib/pdf-parse.js";
// import { checkAndUpdateUsage } from "../utils/usage.js";

// const AI = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });


// // 🔥 GENERATE ARTICLE
// export const generateArticle = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { prompt } = req.body;

//     const allowed = await checkAndUpdateUsage(req, res);
//     if (!allowed) return;

//     const response = await AI.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 500,
//     });

//     const content = response.choices[0].message.content;

//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type)
//       VALUES (${userId}, ${prompt}, ${content}, 'article')
//     `;

//     res.json({ success: true, content });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // 🔥 BLOG TITLE
// export const generateBlogTitle = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { prompt } = req.body;

//     const allowed = await checkAndUpdateUsage(req, res);
//     if (!allowed) return;

//     const response = await AI.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 100,
//     });

//     const content = response.choices[0].message.content;

//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type)
//       VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
//     `;

//     res.json({ success: true, content });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // 🔥 GENERATE IMAGE
// export const generateImage = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { prompt, publish } = req.body;

//     const allowed = await checkAndUpdateUsage(req, res);
//     if (!allowed) return;

//     if (plan !== "premium" && free_usage >= 10) {
//   return res.status(403).json({
//     success: false,
//     message: "🚫 Free limit reached. Upgrade to Quick AI Pro 🚀"
//   });
// }

//     const formData = new FormData();
//     formData.append("prompt", prompt);

//     const { data } = await axios.post(
//       "https://clipdrop-api.co/text-to-image/v1",
//       formData,
//       {
//         headers: { "x-api-key": process.env.CLIPDROP_API_KEY },
//         responseType: "arraybuffer",
//       }
//     );

//     const base64Image = `data:image/png;base64,${Buffer.from(data, "binary").toString("base64")}`;

//     const { secure_url } = await cloudinary.uploader.upload(base64Image);

//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type, publish)
//       VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
//     `;

//     res.json({ success: true, content: secure_url });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // 🔥 REMOVE BACKGROUND
// export const removeImageBackground = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const image = req.file;

//     const allowed = await checkAndUpdateUsage(req, res);
//     if (!allowed) return;

//     if (plan !== "premium" && free_usage >= 10) {
//   return res.status(403).json({
//     success: false,
//     message: "🚫 Free limit reached. Upgrade to Quick AI Pro 🚀"
//   });
// }

//     const { secure_url } = await cloudinary.uploader.upload(image.path, {
//       transformation: [{ effect: "background_removal" }],
//     });

//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type)
//       VALUES (${userId}, 'Remove background', ${secure_url}, 'image')
//     `;

//     res.json({ success: true, content: secure_url });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // 🔥 REMOVE OBJECT
// export const removeImageObject = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { object } = req.body;
//     const image = req.file;

//     const allowed = await checkAndUpdateUsage(req, res);
//     if (!allowed) return;

//     if (plan !== "premium" && free_usage >= 10) {
//   return res.status(403).json({
//     success: false,
//     message: "🚫 Free limit reached. Upgrade to Quick AI Pro 🚀"
//   });
// }

//     const { public_id } = await cloudinary.uploader.upload(image.path);

//     const imageUrl = cloudinary.url(public_id, {
//       transformation: [{ effect: `gen_remove:${object}` }],
//     });

//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type)
//       VALUES (${userId}, ${`Removed ${object}`}, ${imageUrl}, 'image')
//     `;

//     res.json({ success: true, content: imageUrl });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // 🔥 RESUME REVIEW
// export const resumeReview = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const resume = req.file;

//     const allowed = await checkAndUpdateUsage(req, res);
//     if (!allowed) return;


//     if (plan !== "premium" && free_usage >= 10) {
//   return res.status(403).json({
//     success: false,
//     message: "🚫 Free limit reached. Upgrade to Quick AI Pro 🚀"
//   });
// }

//     if (resume.size > 5 * 1024 * 1024) {
//       return res.json({
//         success: false,
//         message: "File too large (max 5MB)",
//       });
//     }

//     const buffer = fs.readFileSync(resume.path);
//     const pdfData = await pdf(buffer);

//     const prompt = `Review this resume:\n${pdfData.text}`;

//     const response = await AI.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 1000,
//     });

//     const content = response.choices[0].message.content;

//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type)
//       VALUES (${userId}, 'Resume Review', ${content}, 'resume')
//     `;

//     res.json({ success: true, content });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// /////////////////////////////////////////////////////////////////////////////////////////////////////////


import Groq from "groq-sdk";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
import pdf from 'pdf-parse/lib/pdf-parse.js'

const AI = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const generateArticle = async (req, res)=>{
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if(plan !== 'premium' && free_usage >=10){
            return res.json({ success: false,    message: " You've reached your free usage limit. Upgrade to Quick AI Pro (Premium) to continue 🚀"
})
        }
           const response = await AI.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{
            role: "user",
            content: prompt,
        },
    ],
    temperature: 0.7,
    max_tokens: 500,
});

const content = response.choices[0].message.content

await sql` INSERT INTO creations (user_id, prompt, content, type)
VALUES (${userId}, ${prompt}, ${content}, 'article')`;

if(plan !== 'premium'){
    await clerkClient.users.updateUser(userId, {
        privateMetadata:{
            free_usage: free_usage + 1
        }
    })
}

res.json({ success: true, content})
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message})
        
    }
}
export const generateBlogTitle = async (req, res)=>{
    try {
        const { userId } = req.auth();
        const { prompt } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if(plan !== 'premium' && free_usage >=10){
            return res.json({ success: false,  message: " You've reached your free usage limit. Upgrade to Quick AI Pro (Premium) to continue 🚀"
})
        }

        const response = await AI.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{
            role: "user",
            content: prompt,
        },
    ],
    temperature: 0.7,
    max_tokens: 100,
});

const content = response.choices[0].message.content

await sql` INSERT INTO creations (user_id, prompt, content, type)
VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

if(plan !== 'premium'){
    await clerkClient.users.updateUser(userId, {
        privateMetadata:{
            free_usage: free_usage + 1
        }
    })
}

res.json({ success: true, content})
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message})
        
    }
}

export const generateImage = async (req, res)=>{
    try {
        const { userId } = req.auth();
        const { prompt, publish } = req.body;
        const plan = req.plan;
       

        if(plan !== 'premium'){
            return res.json({ success: false,message: " You've reached your free usage limit. Upgrade to Quick AI Pro (Premium) to continue 🚀"})
        }

        
        const formData = new FormData()
        formData.append('prompt', prompt)
        const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData,{
            headers: {'x-api-key': process.env.CLIPDROP_API_KEY,},
            responseType: "arraybuffer", 
        })
        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;


         const {secure_url} = await cloudinary.uploader.upload(base64Image)

        await sql` INSERT INTO creations (user_id, prompt, content, type, publish)
        VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})`;

       

res.json({ success: true, content: secure_url})
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message})
        
    }
}

export const removeImageBackground = async (req, res)=>{
    try {
        const { userId } = req.auth();
        const image = req.file;
        const plan = req.plan;
       

        if(plan !== 'premium'){
            return res.json({ success: false, message: " You've reached your free usage limit. Upgrade to Quick AI Pro (Premium) to continue 🚀"})
        }

        
        

         const {secure_url} = await cloudinary.uploader.upload(image.path, {
            transformation: [
                {
                    effect: 'background_removal',
                    background_removal: 'remove_the_background'
                }
            ]
         })

        await sql` INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')`;

       

res.json({ success: true, content: secure_url})
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message})
        
    }
}

export const removeImageObject = async (req, res)=>{
    try {
        const { userId } = req.auth();
        const { object } = req.body;
        const  image = req.file;
        const plan = req.plan;
       

        if(plan !== 'premium'){
            return res.json({ success: false, message: " You've reached your free usage limit. Upgrade to Quick AI Pro (Premium) to continue 🚀"})
        }

        
        

         const {public_id} = await cloudinary.uploader.upload(image.path)

         const imageUrl = cloudinary.url(public_id,{
            transformation: [{effect: `gen_remove:${object}`}],
            response_type: 'image'
         })

        await sql` INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;

       

res.json({ success: true, content: imageUrl})
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message})
        
    }
}

export const resumeReview = async (req, res)=>{
    try {
        const { userId } = req.auth();
        const resume  = req.file;
        const plan = req.plan;
       

        if(plan !== 'premium'){
            return res.json({ success: false, message: " You've reached your free usage limit. Upgrade to Quick AI Pro (Premium) to continue 🚀"})
        }
        if(resume.size > 5 * 1024 * 1024){
            return res.json({success: false, message: "Resume file size exceeds allowed size (5MB)."})
        }

        const dataBuffer = fs.readFileSync(resume.path)
        const pdfData = await pdf(dataBuffer)

        const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`

        const response = await AI.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{
            role: "user",
            content: prompt,
        },
    ],
    temperature: 0.7,
    max_tokens: 1000,
});

const content = response.choices[0].message.content

        await sql` INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;

       

res.json({ success: true, content})
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message})
        
    }
}