
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));
jest.mock('canvas-confetti', () => jest.fn());