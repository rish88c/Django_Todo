import React, { useState, useEffect } from 'react';
import Plan from './Plan';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// Axios Instance
const ai = axios.create({
  baseURL: 'http://127.0.0.1:8000' // Removed Heroku app base URL
});

const App = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  const showPlan = () => {
    ai.get('/list/')
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const addPlan = (d) => {
    if (text !== "") {
      ai.post('/create/', d)
        .then((res) => {
          setText('');
          showPlan();
        })
        .catch((error) => {
          console.error('Error adding plan:', error);
        });
    }
  };

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleAdd = e => {
    let dt = { item: text };
    addPlan(dt);
  };

  const handleDelete = id => {
    console.log("Deleted", id);
    ai.delete(`/delete/${id}`)
      .then((res) => {
        showPlan();
      })
      .catch((error) => {
        console.error('Error deleting plan:', error);
      });
  };

  useEffect(() => {
    showPlan();
  }, []);

  return (
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-sm-6 mx-auto text-white shadow-lg p-3">
          <h2 className="text-center"> Today's Plan </h2>
          <div className="container-fluid">
            <div className="row">
              <div className="col-9">
                <input type="text" className="form-control" placeholder="Write Plan Here" value={text} onChange={handleChange} />
              </div>
              <div className="col-2">
                <button className="btn btn-warning px-5 font-weight-bold" onClick={handleAdd}>Add</button>
              </div>
            </div>
            <div className="conatiner">
              <ul className="list-unstyled row m-5">
                {items.map((value) => (
                  <Plan key={value.id} id={value.id} value={value.item} sendData={handleDelete} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
