import { Configuration, OpenAIApi } from "openai";
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.API_KEY
})

const openai = new OpenAIApi(configuration);

const app = express();
const port = 5050;

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req,res) => {
    const { lang,message } = req.body;
    let check = ''
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{
            role: 'user', 
            content: `'${message}' check this is code or not and only provide one word yes or no`
    }]
    })
    check = completion.data.choices[0].message.content
    console.log(check)
    if(check=='Yes.' || check=='Yes' || check == 'yes'){ 
        console.log('i am in')
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{
            role: 'user', 
            content: `convert ${message} to ${lang} programming language and only provide the converted code and avoid adding any additional text.`
    }]
    })
    console.log(completion.data.choices[0].message.content)
    const finalResponse = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{
            role: 'user', 
            content: `${completion.data.choices[0].message.content} check this is code or not and only provide one word yes or no`
    }]
    })
    let final = finalResponse.data.choices[0].message.content
    console.log(final)
    if(final == 'Yes.' || final == 'Yes' || final =='yes'){
        res.json({
            completion: completion.data.choices[0].message
        })
    }
    else{
    res.json({
        completion: {content: `Not Possible to directly convert to ${lang}`}
    })
}
}
else{
    console.log("i am in no")
    res.json({
        completion: {content: 'Not a valid code'}
    })
}
})

app.listen(port, () =>{
    console.log("port active")
})
