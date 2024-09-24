// category.test.js
import request from 'supertest';
import app from '../app.js'; // Adjust the import based on your structure
import { expect } from 'chai';

describe('Category API Tests', () => {
    let accessToken;
    let createdCategoryId;

    // Get access token before tests
    before(async () => {
        const authRes = await request(app)
            .post('/authentications')
            .send({
                email: 'testtoko@test.com',
                password: '123qweasdzxc'
            });
        accessToken = authRes.body.data.accessToken;
    });

    //Create New Category
    it('should create a new category', async () => {
        const newCategory = {
            name: 'kategori3',
            description: 'deskripsi kategori3'
        };

        const res = await request(app)
            .post('/categories')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(newCategory);

        console.log('Create Category Response:', res.body,'\n'); // Log response body

        expect(res.status).to.equal(201); // Adjust based on expected status
        expect(res.body.data).to.have.property('categoryId'); // Check if ID is returned in response
        
        // Save the created category ID for future use
        createdCategoryId = res.body.data.categoryId;
        console.log('Created Category ID:', createdCategoryId);
    });

    //Read or Get Category Detail (by categoryID)
    it('should get the details of the created category', async () => {
        const res = await request(app)
            .get(`/categories/${createdCategoryId}`)
            .set('Authorization', `Bearer ${accessToken}`);
        
        console.log('Get Category Response:', res.body,'\n');

        expect(res.status).to.equal(200); // Adjust based on expected status
        expect(res.body.data.category).to.have.property('name', 'kategori3');
        expect(res.body.data.category).to.have.property('description', 'deskripsi kategori3');
    });

    //Update existing category (by categoryID)
    it('should update the existing category', async () => {
        expect(createdCategoryId).to.exist;

        const updatedCategory = {
            name: 'kategori3update',
            description: 'kategori3deskripsiupdate'
        };
        
        const res = await request(app)
            .put(`/categories/${createdCategoryId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(updatedCategory);
    
        console.log('Update Category Response:', res.body,'\n');

        // Adjust based on expected status
        expect(res.status).to.equal(200); 
    
        // Check that the response contains the updated name
        expect(res.body.data).to.have.property('name', 'kategori3update');
    });
    
    //Deleting category (by categoryID)
    it('should delete the created category', async () => {
        console.log(`Category ID to Delete: ${createdCategoryId}`);
        const res = await request(app)
            .delete(`/categories/${createdCategoryId}`)
            .set('Authorization', `Bearer ${accessToken}`);
        
        console.log('Delete Category Response:', res.body,'\n');
        expect(res.status).to.equal(200);
    });


});