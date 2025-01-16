const regex = /^[a-zA-ZÀ-ÿ\s]{1,15}$/; // Email válido

export default function validations(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Enter a name";
  }
  if (values.name && !regex.test(values.name)) {
    errors.name = "It must be a valid name";
  }

  return errors;
}
