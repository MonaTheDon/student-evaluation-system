import express, { request, response } from "express";
import { PORT , mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Student } from "./models/student.js";
import studentsRoute from "./routes/studentRoutes.js";
import { Mentor } from './models/mentor.js';
import mentorRoutes from './routes/mentorRoutes.js'
import cors from 'cors';


const app=express();
app.use(express.json());

// app.use(express.static(path.join(__dirname, ".frontend/dist")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./frontend/dist/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });

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
app.use('/mentors', mentorRoutes);

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
    })
    .catch((error)=>{
        console.log(error);
    });