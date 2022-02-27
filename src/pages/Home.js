import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllUser, createUser, deleteUser } from '../api';
import { stages } from '../components/_helpers';
import './home.scss';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  let history = useHistory();
  const startForm = e => {
    e.preventDefault();
    const unique = new Date().getTime();
    createUser(unique).then(res => {
        if(res.stat){
          history.push(`/edit/${unique}`, {state: {id: unique}});
        }
    })
    .catch(() => console.log("error"));
  }
  const removeUser = (e, id) => {
    e.preventDefault();
    deleteUser(id).then(res => {
        if(res){
            setData(res);
        }
    })
    .catch((e) => console.log(e));
  }
  const editUser = (e, id) => {
    e.preventDefault();
    history.push(`/edit/${id}`, {state: {id}});
  }
  useEffect(() => {
    getAllUser().then(user => {
        if(!!user){
            setData(user);
            setLoading(false);
        }
    })
    .catch((e) => console.log(e));
  }, []);
  if(loading){
    return <p className='loading'>Loading...</p>
  }
  return (
    <div className='container homeWrapper'>
      {
        data?.length
        ?
        data?.map((item, index) => (
            <div className='users' key={index}>
                <p>{item.full_name}</p>
                <div className='buttonWrappers'>
                  <button className='edit' onClick={e => editUser(e, item.id)}>Edit</button>
                  <button className='delete' onClick={e => removeUser(e, item.id)}>delete</button>
                </div>
            </div>
        ))
        :
        <p>No candidates found</p>
      }
      <p className='startCandidateButton'><button type='button' onClick={startForm}>Start new candidate</button></p>
    </div>
  )
}
