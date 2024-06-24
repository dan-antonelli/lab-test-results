import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';

const app = express();
const PORT = 3001;
const DB_INIT_FILE = './data/db-init.txt';
const MOCK_DB = './data/mock-db.json';

app.use(cors());
app.use(express.json());

const parseData = async () => {
  try {
    const fileContent = await fs.readFile(MOCK_DB, 'utf8');
    const data = JSON.parse(fileContent);
    return data;
  } catch (error) {
    console.error('Error reading the data file:', error);
    return [];
  }
};

const saveLabResult = async (labResult) => {
  try {
    const data = JSON.parse(await fs.readFile(MOCK_DB, 'utf8'));
    data.push(labResult);
    await fs.writeFile(MOCK_DB, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving the lab result:', error);
    throw error;
  }
};

// remove non-visible characters and trim whitespace
const cleanString = (input) => {
  return input.replace(/[^\x20-\x7E]/g, '').trim();
};

const initDb = async () => {
  try {
    const stats = await fs.stat(MOCK_DB);
    const mockDbContent = await fs.readFile(MOCK_DB, 'utf8');
    if (stats.size > 0 && mockDbContent.length > 0 && JSON.parse(mockDbContent).length > 0) {
      console.log('DB already initialized.');
      return;
    }
  } catch (error) {
    if (error.code !== 'ENOENT' && error.code !== 'EEMPTY') {
      console.error('Error checking DB:', error);
      return;
    }
  }

  try {
    const fileContent = await fs.readFile(DB_INIT_FILE, 'utf8');
    const lines = fileContent.split('\n');
    const headers = lines[0].split('|').map(header => cleanString(header));
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split('|').map(value => cleanString(value));
      const entry = {};

      headers.forEach((header, index) => {
        entry[header] = values[index];
      });

      data.push(entry);
    }

    await fs.writeFile(MOCK_DB, JSON.stringify(data, null, 2), 'utf8');
    console.log('Mock DB initialized from db-init.txt.');
  } catch (error) {
    console.error('Error initializing mock DB:', error);
  }
}

app.get('/api/lab-results', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const data = await parseData();
    const paginatedData = data.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data.length / limit);

    res.json({
      data: paginatedData,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        pageSize: paginatedData.length,
        totalItems: data.length
      }
    });
  } catch (error) {
    console.error('Error fetching paginated lab results:', error);
    res.status(500).send({ message: 'Failed to fetch paginated lab results' });
  }
});

app.post('/api/lab-result', async (req, res) => {
  try {
    await saveLabResult(req.body);
    res.status(201).send({ message: 'Lab result saved successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to save the lab result' });
  }
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});