import React, { useState } from 'react';
import { CreateTodo, GetTodos } from '../../../api/todos';

const Header = () => {
  async function handleAdd() {
    CreateTodo().then(res => {
      console.log(res);
    });
  }
  return (
    <div>
      <h1>Activity</h1>
      <button onClick={handleAdd}>+ Tambah</button>
    </div>
  );
};

export default Header;
