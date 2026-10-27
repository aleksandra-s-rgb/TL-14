// tests/api.spec.ts
import {test, expect} from '@playwright/test';
import {id_ID} from "@faker-js/faker";
let baseURL: string = 'http://localhost:3000/users';
import {StatusCodes } from 'http-status-codes'

test.describe('User management API', () => {

    test('find user: should return a user by ID', async ({ request }) => {
        const response = await request.post(`${baseURL}`)
        const userCreated = await response.json();
        expect(response.status()).toBe(StatusCodes.CREATED);
        const id: number = userCreated.id
        const findUser = await request.get(`${baseURL}/${id}`)
        const responseFindUser = await findUser.json()
        expect(responseFindUser.id).toBe(id)
    });

    test('find user: should return 404 if user not found', async ({ request }) => {
        const users = await request.get(`${baseURL}/101`)
        expect(users.status()).toBe(StatusCodes.NOT_FOUND);
    });

    test('create user: should add a new user', async ({ request }) => {
        const response = await request.post(`${baseURL}`)
        const user = await response.json();
        console.log(user);
        expect(response.status()).toBe(StatusCodes.CREATED);
    });

    test('delete user: should delete a user by ID', async ({ request }) => {
        const response = await request.post(`${baseURL}`)
        const userCreated = await response.json();
        expect(response.status()).toBe(StatusCodes.CREATED);
        const id = userCreated.id
        console.log(userCreated)
        const responseOfDeletedUser = await request.delete(`${baseURL}/${id}`)
        expect(responseOfDeletedUser.status()).toBe(StatusCodes.OK);
    });

    test('delete user: should return 404 if user not found', async ({ request }) => {
        const responseOfDeletedUser = await request.delete(`${baseURL}/101`)
        expect(responseOfDeletedUser.status()).toBe(StatusCodes.NOT_FOUND);
    });


});
