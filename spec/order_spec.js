import { clearInput, handleInput } from '../src/Order.js';

describe('Tests the food ordering chatbot flow', function () {
  beforeEach(function () {
    clearInput();
  });

  it('greets the user on first message', function () {
    const results = handleInput('hello');
    expect(results[0]).toBe("Welcome to Isaac's Pizza & Burger.");
  });

  it('adds a burger order and offers an upsell', function () {
    const results = handleInput('burger');
    expect(results[2]).toBe('Classic Burger added to your order.');
    expect(results[3]).toBe('Would you like to add seasoned fries for $2.99?');
  });

  it('adds a pizza order and offers an upsell', function () {
    const results = handleInput('pizza');
    expect(results[2]).toBe('Pepperoni Pizza Slice Combo added to your order.');
    expect(results[3]).toBe('Would you like to add garlic dip for $1.49?');
  });

  it('handles a no to the upsell and moves to checkout', function () {
    handleInput('burger');
    const results = handleInput('no');
    expect(results[0]).toBe('No problem — keeping just the Classic Burger.');
  });
});
