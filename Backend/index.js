// Entry Point of the API Server
const express = require('express');
const cors = require('cors');

/* Creates an Express application.
The express() function is a top-level function exported by the express module.
*/

const app = express();
const pool = require('./db');

let uniqueId;

/* To handle the HTTP Methods Body Parser is used, Generally used to extract the
entire body portion of an incoming
request stream and exposes it on req.body
*/
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Connected to Database !!!!');
  });
});

//GET Method
app.get('/testdata', (req, res, next) => {
  pool.query('Select * from familytree').then((testData) => {
    res.send(testData.rows);
  });
});

app.get('/testData/:id', (req, res) => {
  const { id } = req.params;

  pool
    .query('SELECT * FROM familytree WHERE id = $1', [id])
    .then((testData) => {
      if (testData.rows.length === 0) {
        return res.status(404).json({ error: 'Data not found' });
      }

      res.status(200).json(testData.rows[0]);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.put('/testData/:id', (req, res) => {
  const { id } = req.params;
  const { name, img, gender, mid, fid, spouse, title } = req.body;

  const updateQuery = `
    UPDATE familytree
    SET name = $1, img = $2, gender = $3, mid = $4, fid = $5, spouse = $6, title = $7
    WHERE id = $8
    RETURNING *`;

  const values = [name, img, gender, mid, fid, spouse, title, id];

  pool
    .query(updateQuery, values)
    .then((updatedData) => {
      if (updatedData.rows.length === 0) {
        return res.status(404).json({ error: 'Data not found or not updated' });
      }

      res.status(200).json({
        message: 'Data updated successfully!',
        updatedData: updatedData.rows[0],
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// POST Method
app.post('/users', async (req, res) => {
  uniqueId = Date.now();
  const id = { uniqueId };
  const display = true;
  try {
    const { name, img, gender, mid, fid, title, spouse } = req.body;
    const queryText =
      'INSERT INTO familytree (id, name, img, gender, mid, fid, title, spouse, display) VALUES ($1, $2, $3 ,$4, $5, $6, $7, $8, $9) RETURNING *';
    const values = [
      uniqueId,
      name,
      img,
      gender,
      mid,
      fid,
      title,
      spouse,
      display,
    ];

    const { rows } = await pool.query(queryText, values);

    res.status(201).json({
      message: 'User added successfully!',
      user: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//DELETE using PUT method
app.put('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const queryText = `
        UPDATE familytree
        SET display = false
        WHERE id = $1
        RETURNING *`;
    const values = [id];
    const { rows } = await pool.query(queryText, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully!',
      user: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Add spouse using PUT method
// app.put('/spouse/:id', async (req, res) => {
//   const { id } = req.params;
//   const newSpouseId = uniqueId;

//   try {
//     const fetchQuery = 'SELECT spouse FROM familytree WHERE id = $1';
//     const fetchValues = [id];
//     const fetchResult = await pool.query(fetchQuery, fetchValues);

//     let currentSpouseIds = fetchResult.rows[0].spouse;

//     // Initialize the spouse array if it's not set or is null
//     if (!currentSpouseIds) {
//       currentSpouseIds = [];
//     }

//     // Ensure currentSpouseIds is an array
//     if (!Array.isArray(currentSpouseIds)) {
//       currentSpouseIds = [currentSpouseIds];
//     }

//     // Add the new spouse ID if it's not already in the array
//     if (!currentSpouseIds.includes(newSpouseId)) {
//       currentSpouseIds.push(newSpouseId);
//     }

//     const updateQuery = `
//       UPDATE familytree
//       SET spouse = $2
//       WHERE id = $1
//       RETURNING *`;
//     const updateValues = [id, currentSpouseIds];

//     const { rows } = await pool.query(updateQuery, updateValues);

//     res.status(200).json({
//       message: 'User updated successfully!',
//       user: rows[0],
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.put('/spouse/:id', async (req, res) => {
  const { id } = req.params;
  const newSpouseId = uniqueId;

  try {
    const fetchQuery = 'SELECT spouse FROM familytree WHERE id = $1';
    const fetchValues = [id];
    const fetchResult = await pool.query(fetchQuery, fetchValues);

    let currentSpouseIds = fetchResult.rows[0].spouse;

    // Initialize the spouse array if it's not set or is null
    if (!currentSpouseIds) {
      currentSpouseIds = [];
    }

    // Ensure currentSpouseIds is an array
    if (!Array.isArray(currentSpouseIds)) {
      currentSpouseIds = [currentSpouseIds];
    }

    // Add the new spouse ID if it's not already in the array
    if (!currentSpouseIds.includes(newSpouseId)) {
      currentSpouseIds.push(newSpouseId);
    }

    const updateQuery = `
      UPDATE familytree
      SET spouse = $2
      WHERE id = $1
      RETURNING *`;
    const updateValues = [id, currentSpouseIds]; // Use the array directly

    const { rows } = await pool.query(updateQuery, updateValues);

    res.status(200).json({
      message: 'User updated successfully!',
      user: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//PUT Method
app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, img, gender, mid, fid, spouse, title } = req.body;
  try {
    const queryText = `
        UPDATE familytree
        SET name = $1, img = $2, gender = $3, mid = $4, fid = $5, spouse=$6, title=$7
        WHERE id = $8
        RETURNING *`;
    const values = [name, img, gender, mid, fid, spouse, title, id];
    const { rows } = await pool.query(queryText, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully!',
      user: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Require the Routes API
// Create a Server and run it on the port 3000
const server = app.listen(3005, function () {
  let host = server.address().address;
  let port = server.address().port;
  // Starting the Server at the port 3005
});
