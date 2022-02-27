import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { getAllUser, createUser, deleteUser } from '../api';

export default function Home() {
  const [data, setData] = useState(null);
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
  useEffect(() => {
    getAllUser().then(user => {
        if(!!user){
            setData(user);
        }
    })
    .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      {
        data?.length
        ?
        data?.map((item, index) => (
            <div key={index}>
                {item.id}
                <Link to={{
                    pathname: `/edit/${item.id}`,
                    state: {id: item.id}
                }}>Edit</Link>
                <button onClick={e => removeUser(e, item.id)}>delete</button>
            </div>
        ))
        :
        <p>No candidates found</p>
      }
      <button onClick={startForm}>Start new candidate</button>
    </div>
  )
}
