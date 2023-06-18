import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
	let component;
    const user = {
        username: 'user1',
        password: 'pass'
    }
	const blog = {
		title: 'Cool blog',
		author: 'Somebody',
		url: 'https://cool.website.for.blogs.com',
		likes: 0,
		user: {
			username: 'user1',
			name: 'User_!',
			blogs: []
		},
	};

	const mockHandler = jest.fn();

	beforeEach(() => {
        window.localStorage.setItem('loggedUser', JSON.stringify(user));
		component = render(
			// <Blog
			// 	blog={blog}
			// 	own={true}
			// 	handleLike={mockHandler}

			// />
            <Blog key={blog.id} blog={blog} handleLike={mockHandler}
            handleRemove={mockHandler}/>
		);
	});

	test('renders title and author, but not url and likes', () => {
        // const div = component.container.querySelector('.toggableObj')
        // expect(div).toHaveStyle('display: none')

        expect(screen.getByText(blog.title)).toBeDefined()
        expect(screen.getByText(blog.author)).toBeDefined()

        expect(screen.queryByText(`url: ${blog.url}`)).toBeNull()
        expect(screen.queryByText(`likes: ${blog.likes}`)).toBeNull()
	});

	test('renders url and likes if clicked', () => {
		const button = component.getByText('view');
		fireEvent.click(button);

		const url = component.container.querySelector('.blog_url');
        expect(url).not.toHaveStyle('display: none')
		expect(url).toHaveTextContent(`url:${blog.url}`);

        const likes = component.container.querySelector('.blog_likes');
        expect(likes).not.toHaveStyle('display: none')
		expect(likes).toHaveTextContent(`likes: ${blog.likes}`);
	});

	test('double click of like button functions correctly', () => {
		const buttonShow = component.getByText('view');
		fireEvent.click(buttonShow);
		const buttonLike = component.getByText('like');
		fireEvent.click(buttonLike);
		fireEvent.click(buttonLike);
		expect(mockHandler.mock.calls).toHaveLength(2);
	});

});