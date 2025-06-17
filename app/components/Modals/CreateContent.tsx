'use clinet';

import React, { useContext, useState } from 'react';

function CreateContent() {
  const [title, setTitle] = useState();
  const [description, setDesciption] = useState();
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

  return (
    <div>
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
    </div>
  );
}

export default CreateContent;
