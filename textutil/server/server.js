const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { collection } = require('./src/connection');
const app = express();
const PORT = 3001;

require('./src/connection');

app.use(cors());
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email: email });

    if (user) {
      // Check if the userType matches what is expected (e.g., 'buyer' or 'seller')
      if (user.userType === 'buyer' || user.userType === 'seller') {
        res.json("exist");
      } else {
        res.json("mismatch");
      }
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post('/signup', async (req, res) => {
  const { email, firstName, lastName, password, userType } = req.body;
  console.log("inside signup", req.body);

  const data = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
    userType: userType,
  };

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");

      // Handle logic based on userType
      // You can customize this part based on your requirements
      if (userType === "buyer") {
        // Logic for buyer
        console.log("User is a buyer");
      } else if (userType === "seller") {
        // Logic for seller
        console.log("User is a seller");
      } else {
        // Handle other userType if needed
        console.log("User has a different userType");
      }

      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post('/api/categories', async (req, res) => {
  const { Category_display_name, title, price, description, imageUrl } = req.body;
  console.log(req.body);

  if (!Category_display_name || !title || !price || !description || !imageUrl) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const newCategory = {
    id: (await collection.countDocuments()) + 1, // Generating a new id
    Category_display_name,
    title,
    price,
    description,
    imageUrl,
    Created_at: new Date(),
    Updated_at: new Date(),
  };

  try {
    const result = await collection.insertOne(newCategory);
    res.status(201).json(result); // Return the inserted document
    
  } catch (error) {
    console.error('Error inserting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await collection.find().toArray();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});