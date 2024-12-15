const { test, expect } = require('@playwright/test');

test.describe('API Testing - To-Do List', () => {
  
  test('GET /todos - Verify list of to-dos', async ({ request }) => {
    const response = await request.get('/todos');
    expect(response.status()).toBe(200);

    const todos = await response.json();
    expect(Array.isArray(todos)).toBeTruthy();
    todos.forEach(todo => {
      expect(todo).toHaveProperty('userId');
      expect(todo).toHaveProperty('id');
      expect(todo).toHaveProperty('title');
      expect(todo).toHaveProperty('completed');
    });
  });

  test('POST /todos - Create a new to-do item', async ({ request }) => {
    const newTodo = { title: 'New Task', completed: false };
    const response = await request.post('/todos', { data: newTodo });
    expect(response.status()).toBe(201);

    const todo = await response.json();
    expect(todo.title).toBe(newTodo.title);
    expect(todo.completed).toBe(newTodo.completed);
  });

  test('PUT /todos/{id} - Update an existing to-do', async ({ request }) => {
    const updatedTodo = { title: 'Updated Task', completed: true };
    const response = await request.put('/todos/1', { data: updatedTodo });
    expect(response.status()).toBe(200);

    const todo = await response.json();
    expect(todo.title).toBe(updatedTodo.title);
    expect(todo.completed).toBe(updatedTodo.completed);
  });

  test('DELETE /todos/{id} - Delete a to-do item', async ({ request }) => {
    const response = await request.delete('/todos/1');
    expect(response.status()).toBe(200);
  });

  test('Error Handling - Non-existent ID', async ({ request }) => {
    const response = await request.get('/todos/99999');
    expect(response.status()).toBe(404);
  });

  /*const startTime = Date.now();
  const response = await request.get('/todos');
  const endTime = Date.now();
  expect(endTime - startTime).toBeLessThan(1000); // Ensure response time < 1s*/


});

