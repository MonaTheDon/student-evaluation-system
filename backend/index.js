import express, { request, response } from "express";
import { PORT , mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Student } from "./models/student.js";
import studentsRoute from "./routes/studentRoutes.js";

const app=express();
app.use(express.json());

//middleware for handling cors policy
//allow all origings with deffaukt of cors(*)
// app.use(cors());

// OR allow custom origings(better option)
app.use(
    cors({
        origin:'http://localhost:3000',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-Type'],
    }
    )
);

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send("Welcome!")
});

app.use('/students',studentsRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT,()=>{
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });