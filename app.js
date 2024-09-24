import express from 'express';
import axios from 'axios';

const app = express();  //creating server for requesting API
app.use(express.json());

// 1. Endpoint to authenticate user
app.post('/authentications', async (req, res) => {
    try {
        const response = await axios.post('https://kasir-api.zelz.my.id/authentications', req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
            ...(error.response?.data || {})
        });
    }
});

// 2. Endpoint to create a new category
app.post('/categories', async (req, res) => {
    try {
        const response = await axios.post('https://kasir-api.zelz.my.id/categories', req.body, {
            headers: {
                'Authorization': `Bearer ${req.headers.authorization.split(' ')[1]}`
            }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
            ...(error.response?.data || {})
        });
    }
});


// 3. Endpoint to get a specific category by ID
app.get('/categories/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://kasir-api.zelz.my.id/categories/${req.params.id}`, {
            headers: {
                'Authorization': `Bearer ${req.headers.authorization.split(' ')[1]}`
            }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
            ...(error.response?.data || {})
        });
    }
});

// 4. Endpoint to update a category
app.put('/categories/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const response = await axios.put(`https://kasir-api.zelz.my.id/categories/${id}`, {
            name,
            description
        }, {
            headers: {
                'Authorization': `Bearer ${req.headers.authorization.split(' ')[1]}` // Extract token from header
            }
        });
        
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
            ...(error.response?.data || {})
        });
    }
});

// 5. Endpoint to delete a category
app.delete('/categories/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.delete(`https://kasir-api.zelz.my.id/categories/${id}`, {
            headers: {
                'Authorization': `Bearer ${req.headers.authorization.split(' ')[1]}` // Extract token from header
            }
        });
        
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
            ...(error.response?.data || {})
        });
    }
});

// Export the app
export default app;
