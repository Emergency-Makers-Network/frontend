import React from 'react';
import useProductsQuery from './products.queries';
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from './products.mutations';
import BusyIndicator from '../../widgets/busyIndicator';
import { Table } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const FormattedDateTime = ({
  date,
  locale,
  yearFormat,
  monthFormat,
  dayFormat,
}) =>
  new Intl.DateTimeFormat(locale, {
    year: yearFormat,
    month: monthFormat,
    day: dayFormat,
  }).format(new Date(date));

// https://ultimatecourses.com/blog/graphql-client-side-integration-with-apollo-hooks
const Products = () => {
  const { data, loading, refetch } = useProductsQuery();
  const doDelete = useDeleteProductMutation();

  if (loading)
    return (
      <BusyIndicator>
        <h2>Loading Products...</h2>
      </BusyIndicator>
    );
  if (!data || !data.products) return null;
  const { products } = data;
  return (
    <div>
      <h2>Products</h2>
      <Table striped hover>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Thumbnail</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>CreatedAt</th>
            <th>Controls</th>
          </tr>
          {products &&
            products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: '150px', height: '150Px' }}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>
                  <FormattedDateTime
                    date={item.createdAt}
                    locale="en-US"
                    yearFormat="numeric"
                    monthFormat="long"
                    dayFormat="2-digit"
                  />
                </td>
                <td>
                  <Controls
                    product={item}
                    reloadAction={refetch}
                    deleteAction={doDelete}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

const Controls = ({ product, reloadAction, deleteAction }) => {
  const updateMetadata = useUpdateProductMutation();
  const { name, description, imageUrl, price } = product;
  return (
    <div>
      <Formik
        initialValues={{ name, description, imageUrl, price }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Name is required';
          }
          if (!values.description) {
            errors.description = 'Description is required';
          }
          if (!values.imageUrl) {
            errors.imageUrl = 'Image URL is required';
          }
          if (!values.price) {
            errors.price = 'Price is required';
          }
          return errors;
        }}
        onSubmit={(
          { name, description, imageUrl, price },
          { setSubmitting }
        ) => {
          updateMetadata({
            id: product.id,
            name,
            description,
            imageUrl,
            price,
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field placeholder="Name" type="text" name="name" />
            <ErrorMessage name="name" component="div" />
            <Field
              placeholder="Description"
              type="text"
              component="textarea"
              name="description"
            />
            <ErrorMessage name="description" component="div" />
            <Field placeholder="Price" type="text" name="price" />
            <ErrorMessage name="price" component="div" />
            <Field placeholder="Image URL" type="text" name="imageUrl" />
            <ErrorMessage name="imageUrl" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Update
            </button>
            <button type="button" onClick={() => reloadAction()}>
              Reload
            </button>
            <button type="button" onClick={() => deleteAction(product)}>
              Delete
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Products;
