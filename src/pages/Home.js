import { useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom';
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
      <button onClick={startForm}>Start new candidate</button>
    </div>
  )
}
