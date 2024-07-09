import React, { useState, useEffect } from 'react';
import ForgeReconciler, {
  Form,
  Label,
  Textfield,
  useForm,
  FormSection,
  FormFooter,
  ButtonGroup,
  LoadingButton,
  Button,
  Select,
} from "@forge/react";
import { view } from '@forge/bridge';

const Edit = () => {
  const [renderContext, setRenderContext] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, getFieldId, getValues } = useForm();

  useEffect(() => {
    view.getContext().then((context) => setRenderContext(context.extension.renderContext));
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const { fieldName } = getValues();
      let result = '';
      
      for (let i = 0; i < fieldName.length; i++)
      {
        result += fieldName[i].value;
        if (i != fieldName.length - 1)
          result += ',';
      }

      console.log(result);

      await view.submit(result);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  return renderContext === 'issue-view' ? (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormSection>
        <Select isMulti
          options={[
            { label: "TEST", value: "test" },
            { label: "PROD", value: "prod" }]}
        {...register('fieldName')}>
      </Select>
      </FormSection>
      <FormFooter>
        <ButtonGroup>
          <Button appearance="subtle" onClick={view.close}>Close</Button>
          <LoadingButton appearance="primary" type="submit" isLoading={isLoading}>
            Submit
          </LoadingButton>
        </ButtonGroup>
      </FormFooter>
    </Form>
  ) : (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label labelFor={getFieldId('fieldName')}>
        Custom field value
      </Label>
        <Select isMulti
          options={[
            { label: "TEST", value: "test" },
            { label: "PROD", value: "prod" }]}
        {...register('fieldName')}>
          
      </Select>
    </Form>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <Edit />
  </React.StrictMode>
);
