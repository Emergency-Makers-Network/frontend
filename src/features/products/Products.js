import React from 'react';
import useProductsQuery from './products.queries';
import {
  useDeleteProductMutation,
  useUpdateProductMetadataMutation,
} from './products.mutations';
import BusyIndicator from '../../widgets/busyIndicator';
import { Formik, Form, Field, ErrorMessage } from 'formik';

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
      <ul>
        {products &&
          products.map((item) => (
            <li key={item.id}>
              <b>({item.id})</b>: {item.name}
              <div>
                <Controls
                  product={item}
                  reloadAction={refetch}
                  deleteAction={doDelete}
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

const Controls = ({ product, reloadAction, deleteAction }) => {
  const updateMetadata = useUpdateProductMetadataMutation();
  const { name, description, imageUrl } = product;
  return (
    <div>
      <Formik
        initialValues={{ name, description, imageUrl }}
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
          return errors;
        }}
        onSubmit={({ name, description, imageUrl }, { setSubmitting }) => {
          updateMetadata({ id: product.id, name, description, imageUrl });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field placeholder="Name" type="text" name="name" />
            <ErrorMessage name="name" component="div" />
            <Field placeholder="Description" type="text" name="description" />
            <ErrorMessage name="description" component="div" />
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
