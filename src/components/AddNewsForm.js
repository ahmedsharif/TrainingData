import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FileInput from './FileInput';
import { Button, Col, ControlLabel, Form, FormGroup } from 'react-bootstrap';

const AddNewsForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Form horizontal onSubmit={handleSubmit}>
      <FormGroup controlId="formHorizontal">
        <Col componentClass={ControlLabel} sm={2}>
          {' '}
        </Col>
        <Col sm={10}>
          <h3> Add News </h3>
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalTitle">
        <Col componentClass={ControlLabel} sm={2}>
          News Title
        </Col>
        <Col sm={10}>
          <Field
            name="title"
            component="input"
            type="text"
            placeholder="Write title for the news"
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalContent">
        <Col componentClass={ControlLabel} sm={2}>
          content
        </Col>
        <Col sm={10}>
          <Field name="content" component="textarea" />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalimage">
        <Col componentClass={ControlLabel} sm={2}>
          image
        </Col>
        <Col sm={10}>
          <Field name={'image'} component={FileInput} />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit" disabled={pristine || submitting}>
            Submit
          </Button>
          <Button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default reduxForm({
  form: 'addNews',
})(AddNewsForm);
