import React from 'react';
import Form from '../components/Form';
import Header from '../components/Form/Header';

export default function Edit(props) {
  return (
    <div className='container'>
      <Header />
      <Form userID={props.match.params.id}/>
    </div>
  )
}
