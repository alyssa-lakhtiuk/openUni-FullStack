import React from 'react'
import { useState } from 'react';
import PropTypes from 'prop-types'

const BlogForm = ({
    setVisible,
    handleSubmit,
}) => {
    const [ title, setTitle ] = useState('');
	const [ author, setAuthor ] = useState('');
	const [ url, setUrl ] = useState('');

    const addNewBlog = (event) => {
		event.preventDefault();

		handleSubmit({
			title: title,
			author: author,
			url: url,
		});

		setTitle('');
		setAuthor('');
		setUrl('');
	};

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const handleAuthorChange = (event) => {
		setAuthor(event.target.value);
	};

	const handleUrlChange = (event) => {
		setUrl(event.target.value);
	};

    return (
        <>
            {/* <h2>create new</h2> */}
            <form onSubmit={addNewBlog}>
                <div>
                    <div> title: <input type="text" id="title" name="Title" value={title} onChange={handleTitleChange}/> </div>
                    <div> author: <input type="text" id="author" name="Author" value={author} onChange={handleAuthorChange}  /> </div>
                    <div> url: <input type="text" id="url" name="URL" value={url} onChange={handleUrlChange} /> </div>
                </div>
                <button type="submit" id="create" onClick={() => setVisible(false)}>create</button>
                <button type="button" onClick={() => setVisible(false)}>cancel</button>
            </form>
        </>
    )
}

BlogForm.propTypes = {
    setVisible: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}

export default BlogForm