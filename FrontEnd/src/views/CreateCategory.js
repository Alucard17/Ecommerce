import React, {Component} from 'react'
import {Formik} from 'formik';
import * as yup from 'yup';
import {Form, Button, Col, Row} from 'react-bootstrap';
import RSelect from 'react-select';

const CategorySchema = yup.object({
    name: yup.string().required(),
    isActive: yup.bool().required(),
    parentCategoryID: yup.string()
});


export default class CreateCategory extends Component {
    state = {
        existingCategories: [{value: '', label: 'Select'}]
    }

    async componentDidMount() {
        const res = await (await fetch("http://localhost:8080/category")).json();
        let Category = res.docs.map(c => ({
            value: c._id,
            label: c.name
        }));
        this.setState({existingCategories: [...this.state.existingCategories, ...Category]});
    }
    async postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
      }
    async submitForm(data){
        let res = await this.postData("http://localhost:8080/category", data);
        console.log(res);
    }
    render() {
        return (
            <>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Create New Category</h1>
                </div>
                <Formik
                    validationSchema={CategorySchema}
                    onSubmit={data => this.submitForm(data)}
                    initialValues={{
                        name: '',
                        isActive: true,
                        parentCategoryID: ''
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        errors,
                        setFieldValue
                    }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="Name">
                                        <Form.Label>Category's Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.name && !errors.name}
                                            isInvalid={touched.name && !!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="IsActive">
                                        <Form.Check
                                            checked={values.isActive}
                                            onChange={() => setFieldValue('isActive', !values.isActive)}
                                            type="switch"
                                            label="Is Active"
                                            id="is-Active"
                                        />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="ParentCat">
                                    <Form.Label>Parent Category</Form.Label>
                                        <RSelect
                                            name="parentCategoryID"
                                            value={this.state.existingCategories.find(opt => opt.value === values.parentCategoryID)}
                                            options={this.state.existingCategories}
                                            onChange={option => setFieldValue('parentCategoryID', option.value)}
                                            isValid={touched.parentCategoryID && !errors.parentCategoryID}
                                            isInvalid={touched.parentCategoryID && !!errors.parentCategoryID}
                                        />
                                    <Form.Control.Feedback style={{ display: 'block' }} type="invalid">{errors.parentCategoryID}</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Button type="submit">Submit form</Button>
                            </Form>
                        )}
                </Formik>
            </>
        )
    }
}
