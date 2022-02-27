import React from 'react';
import Form from '../components/Form';

export default function Edit(props) {
  return (
    <Form userID={props.match.params.id}/>
  )
}
