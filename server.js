require("dotenv").config();
const  express = require('express');
const app = express();

require("./config/db");

const swaggerUi= require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const authMiddleware= require("./middleware/authMiddleware");

app.use(express.json());

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/api", taskRoutes);
app.use("/api",authRoutes);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "Staj projesi için task CRUD API dokümantasyonu"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ],
     components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
 apis: ["./routes/taskRoutes.js","./routes/authRoutes.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get("/",(req,res)=>
{
    res.send("Task management API çalışıyor");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>
{
    console.log(`Server ${PORT} portunda çalışıyor`);
});

app.get("/api/protected",authMiddleware,(req,res)=>
{
  res.json({
    message: "Protected route access successfully",
    user: req.user
  });
});
