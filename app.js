// app.js
import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

// Endpoint to authenticate user
app.post('/authentications', async (req, res) => {
    try {
        const response = await axios.post('https://kasir-api.zelz.my.id/authentications', req.body);
        console.log('API Response:', response.data); //debug
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
