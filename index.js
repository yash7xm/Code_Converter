import { Configuration, OpenAIApi } from "openai";
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

const configuration = new Configuration({
    apiKey: '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'
})

const openai = new OpenAIApi(configuration);

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req,res) => {
    const { lang,message } = req.body;

    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{
            role: 'user', 
            content: `convert ${message} to ${lang} only provide code and dont write a single other word`
    }]
    })
    res.json({
        completion: completion.data.choices[0].message
    })
})

app.listen(port, () =>{
    console.log("port active")
})