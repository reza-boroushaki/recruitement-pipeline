import React from 'react';
import Form from '../components/Form';

export default function Edit(props) {
  return (
    <div className='container'>
      <Form userID={props.match.params.id}/>
    </div>
  )
}
