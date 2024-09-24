// app.js
import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());
let categories = [];


const fetchCategories = async () => {
    try {
        const response = await axios.get('https://kasir-api.zelz.my.id/categories/');
        return response.data.data.categories; // Return categories directly
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        return []; // Return an empty array on error
    }
};

// Endpoint to authenticate user
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

// Endpoint to create a new category
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


// Endpoint to get a specific category by ID
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

// Endpoint to update a category
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

// Endpoint to delete a category
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

    // try {
    //     const categories = await fetchCategories(); // Fetch categories when needed
    //     const category = categories.find(cat => cat.id === categoryId);

    //     if (category) {
    //         // Perform deletion logic here (assume a delete function exists)
    //         // For example:
    //         // await deleteCategoryById(categoryId);
    //         res.status(200).json({ message: 'Category deleted successfully' });
    //     } else {
    //         res.status(404).json({ message: 'Category not found' });
    //     }
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }

    }
});

// Export the app
export default app;
