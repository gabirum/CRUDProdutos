import { useState } from 'react';

export default function useForm(dataInitialState) {
  const [data, setData] = useState(dataInitialState);

  function handleChange(event) {
    const {name, value} = event.currentTarget;

    setData({...data, [name]: value});
  }

  return {
    data,
    setData,
    handleChange
  }
}