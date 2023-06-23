const express= require("express")

const app = express()
app.use(express.json())

const OPENAI_API_KEY="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"

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey:OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// openai.listEngines().then((response)=>{
//     console.log(response)
// })




// app.post("/query", async (req, res) => {

//     const prompt = req.body.prompt || "how are you?"

//     try {
//         const response = await openai.createCompletion({
//             model:"text-davinci-003",
//             prompt
//         })

//         return res.status(200).json({
//             success: true,
//             data: response.data.choices[0]
//         })
//     } catch (error) {
//         return res.status(400).json({
//             success: false,
//             error: error.response 
//             ? error.response.data
//             : "There was an issue on the server"
//         })
//     }
// })

app.get("/",(req,res)=>{
res.send("wlcom")
})

app.post("/chat" ,(req,res)=>{
    const question=req.body.question

    openai.createCompletion({
      model:"text-davinci-003",
      prompt:question,
      max_tokens:400,
      temperature:0,
  }).then((response)=>{
      return response?.data?.choices?.[0]?.text;
  }).then((answer) => {
   const array = answer?.split("\n").filter((value)=>value).map((value)=> value.trim())

   return array
  }).then((answer)=>{
    res.json({
      answer:answer,
      prompt:question,
  })
  })
    console.log({question})
   
})
// app.post("/chat", (req, res) => {
//   const question = req.body.question;

//   openai
//     .createCompletion({
//       model: "text-davinci-003",
//       prompt: question,
//       max_tokens: 4000,
//       temperature: 0,
//     })
//     .then((response) => {
//       console.log({ response });
//       return response?.data?.choices?.[0]?.text;
//     })
//     .then((answer) => {
//       console.log({ answer });
//       const array = answer
//         ?.split("\n")
//         .filter((value) => value)
//         .map((value) => value.trim());

//       return array;
//     })
//     .then((answer) => {
//       res.json({
//         answer: answer,
//         propt: question,
//       });
//     });
//   console.log({ question });
// });

app.listen(3000,()=>{
    console.log('server is lsitening on port');
})


// const express = require("express");
// const OPENAI_API_KEY = "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"
// ;
// const { Configuration, OpenAIApi } = require("openai");
// const cors = require("cors");
// const configuration = new Configuration({
//   apiKey: OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// const app = express();
// app.use(cors());

// app.use(express.json());

// app.get("/ping", (req, res) => {
//   res.json({
//     message: "pong",
//   });
// });
// app.post("/", (req, res) => {
//   const question = req.body.question;

//   openai
//     .createCompletion({
//       model: "text-davinci-003",
//       prompt: question,
//       max_tokens: 4000,
//       temperature: 0,
//     })
//     .then((response) => {
//       console.log({ response });
//       return response?.data?.choices?.[0]?.text;
//     })
//     .then((answer) => {
//       console.log({ answer });
//       const array = answer
//         ?.split("\n")
//         .filter((value) => value)
//         .map((value) => value.trim());

//       return array;
//     })
//     .then((answer) => {
//       res.json({
//         answer: answer,
//         propt: question,
//       });
//     });
//   console.log({ question });
// });

// app.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });

//   const express= require("express")

// const app = express()
// app.use(express.json())

// const OPENAI_API_KEY="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"

// const { Configuration, OpenAIApi } = require("openai");
// const configuration = new Configuration({
//     apiKey:OPENAI_API_KEY,
// });
//   const openai = new OpenAIApi(configuration);
// const express= require("express")
// const cors=require("cors")
// const { Configuration, OpenAIApi } = require("openai");
// const configuration = new Configuration({
//     apiKey:"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",
//   });
  
//   const openai = new OpenAIApi(configuration);
  
//   const app = express()
//   app.use(cors())
//   app.use(express.json())
  
//   app.get('/', async (req, res) => {
//     res.status(200).send({
//       message: 'Hello from CodeX!'
//     })
//   })
  
//   app.post('/', async (req, res) => {
//     try {
//       const prompt = req.body.prompt;
  
//       const response = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: `${prompt}`,
//         temperature: 0, // Higher values means the model will take more risks.
//         max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
//         top_p: 1, // alternative to sampling with temperature, called nucleus sampling
//         frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
//         presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
//       });
  
//       res.status(200).send({
//         bot: response.data.choices[0].text
//       });
  
//     } catch (error) {
//       console.error(error)
//       res.status(500).send(error || 'Something went wrong');
//     }
//   })
  
//   app.listen(5000, () => console.log('AI server started on http://localhost:5000'))