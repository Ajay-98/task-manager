import { describe, it, expect } from 'vitest';
import { todoreducer } from './App';

describe('todoreducer', () => {
  const sample = [{ id: 1, text: 'Test', completed: false }];

  it('adds a todo', () => {
    const newTodo = [{ id: 2, text: 'New', completed: false }];
    const result = todoreducer(sample, { type: 'ADD_TODOS', payload: newTodo });
    expect(result).toHaveLength(2);
  });

  it('toggles completed status', () => {
    const result = todoreducer(sample, { type: 'TOGGLE_TODOS', payload: 1 });
    expect(result[0].completed).toBe(true);
  });

  it('deletes a todo', () => {
    const result = todoreducer(sample, { type: 'DELETE_TODOS', payload: 1 });
    expect(result).toHaveLength(0);
  });
});