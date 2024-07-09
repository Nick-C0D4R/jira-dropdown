import React, { useState, useEffect } from 'react';
import ForgeReconciler, {
  Select,
  Text,
} from "@forge/react";
import { view } from '@forge/bridge';

const View = () => {
  const [fieldValue, setFieldValue] = useState(null);

  useEffect(() => {
    view.getContext().then((context) => { setFieldValue(context.extension.fieldValue) });
  }, []);

  const options = [
    { label: "TEST", value: "test" },
    { label: "PROD", value: "prod" }];

  const convertToOption = (value) => {
    if (value != null) {
      let option = value.split(',');
      let result = [];
      console.log(option);
      for (let i = 0; i < option.length; i++){
        let optionValue = options.find(x => x.value == option[i]);
        result.push(optionValue);
      }
    return result;
    }
  }

  const handleChange = (value) => {
    let result = '';
      
      for (let i = 0; i < value.length; i++)
      {
        result += value[i].value;
        if (i != value.length - 1)
          result += ',';
      }
    console.log(result);
    setFieldValue(result);
    console.log(fieldValue);
    res = convertToOption(fieldValue);
    console.log(res);
  }

  let res = convertToOption(fieldValue);
  console.log(res);
  

  return (
    <>
      <Select isMulti
        options={options}
        onChange={handleChange}
        value={res}>
      </Select>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <View />
  </React.StrictMode>
);
