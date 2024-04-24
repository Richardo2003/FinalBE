
const express = require("express");
const db = require("./db");
const app = express();
const port = 3001;
const { Pool } = require("pg");

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//-----------------------
//Get data tabel 
app.get("/customer", async (req, res) => {
  try {
    const allCustomer = await prisma.customer.findMany();
    res.status(200).json({
      status: "get data success",
      data: allCustomer,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


//------------------------
//Post data tabel 
app.post("/customer", async (req, res) => {
  try {
    const { name, address, phone_number } = req.body;

    await prisma.customer.create({
      data: {
        name: name,
        address: address,
        phone_number: phone_number,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Data berhasil di post",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


// app.post("/dosen", async (req, res) => {
//   try {
//     const { name, address } = req.body;

//     await prisma.dosen.create({
//       data: {
//         name: name,
//         address: address,
//       },
//     });

//     res.status(200).json({
//       status: "success",
//       message: "Data berhasil dimasukkan",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

//-------------------------------
//Get ID data dari tabel students
app.get("/customer/:id", async (req, res) => {
  const customerId = req.params.id;

  try {
    const student = await prisma.customer.findUnique({
      where: {
        id: parseInt(customerId),
      },
    });

    if (!customer) {
      res.status(404).json({
        status: "error",
        message: "Data students tidak ditemukan",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: customer,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//--------------------------------
//Update ID data ke tabel customer
app.put("/customer/:id", async (req, res) => {
  const customerId = req.params.id;
  const { name, address, phone_number } = req.body;

  try {
    await prisma.customer.update({
      where: {
        id: parseInt(customerId),
      },
      data: {
        name: name,
        address: address,
        phone_number: phone_number,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Data berhasil di update",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//-----------------------------------
//Delete ID Data dari tabel customer
app.delete("/customer/:id", async (req, res) => {
  const customerId = req.params.id;
  try {
    await prisma.customer.deleteMany({
      where: {
        id: parseInt(customerId),
      },
    });

     res.status(200).json({
      status: "success",
      message: "Data berhasil di delete",
    });
  } catch (error) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);