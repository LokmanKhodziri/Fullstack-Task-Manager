'use client';

import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

function CreateContent() {
  const [title, setTitle] = useState('');
  const [description, setDesciption] = useState('');
  const [date, setDate] = useState();
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const handleChange = (name: string) => (e: any) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    switch (name) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'description':
        setDesciption(e.target.value);
        break;
      case 'date':
        setDate(e.target.value);
        break;
      case 'completed':
        setCompleted(e.target.checked);
        break;
      case 'important':
        setImportant(e.target.checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate required fields
    if (!title || !description || !date) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (title.length < 3) {
      toast.error('Title must be at least 3 characters long');
      return;
    }

    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      const res = await axios.post('/api/tasks', task);

      if (res.data.error) {
        toast.error(res.data.error);
        return;
      }
      toast.success('Task Created Successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Content</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          placeholder="Enter title"
          onChange={handleChange('title')}
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={description}
          rows={5}
          placeholder="Enter description"
          onChange={handleChange('description')}
        />
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          name="date"
          onChange={handleChange('date')}
        />
      </div>
      <div className="input-control">
        <label htmlFor="completed">Toggle Completed</label>
        <input
          type="checkbox"
          id="completed"
          value={completed.toString()}
          name="completed"
          onChange={handleChange('completed')}
        />
      </div>
      <div className="input-control">
        <label htmlFor="important">Toggle Important</label>
        <input
          type="checkbox"
          id="important"
          value={important.toString()}
          name="important"
          onChange={handleChange('important')}
        />
      </div>

      <div className="submit-btn">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default CreateContent;
