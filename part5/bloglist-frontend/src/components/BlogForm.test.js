import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

describe('BlogForm creating', () => {

	test('creates a new form', () => {
		
		const handleSubmit = jest.fn();
        const setVisible = jest.fn();
		const component = render(
			<BlogForm handleSubmit={handleSubmit} setVisible={setVisible} />
		);
		const title = component.container.querySelector('#title');
		const author = component.container.querySelector('#author');
		const url = component.container.querySelector('#url');
		const form = component.container.querySelector('form');

		fireEvent.change(title, {
			target: { value: "Cool Blog" }
		});
		fireEvent.change(author, {
			target: { value: 'Somebody' }
		});
		fireEvent.change(url, {
			target: { value: 'https://cool.website.com' }
		});		

		fireEvent.submit(form);
		expect(handleSubmit.mock.calls).toHaveLength(1);
		expect(handleSubmit.mock.calls[0][0].title).toBe("Cool Blog");
		expect(handleSubmit.mock.calls[0][0].author).toBe('Somebody');
		expect(handleSubmit.mock.calls[0][0].url).toBe('https://cool.website.com');
	});

});