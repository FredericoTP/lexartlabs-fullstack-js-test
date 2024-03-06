import { useState } from 'react';

function useInputNumber(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event) {
    const newValue = parseFloat(event.target.value);

    if (!Number.isNaN(newValue)) {
      setValue(newValue);
    }
  }

  return {
    value,
    setValue,
    handleChange,
  };
}

export default useInputNumber;
