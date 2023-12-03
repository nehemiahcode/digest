export default function LoginValidate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater than 8 and less than 20";
  } else if (values.password.includes(" ")) {
    errors.password = "Remove the space";
  }

  return errors;
}

export function RegisterValidate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length < 2 || values.name.length > 17) {
    errors.name = "Must be greater than 2 and less than 17";
  } else if (values.name.includes(" ")) {
    errors.name = "Remove the space";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater than 8 and less than 20";
  } else if (values.password.includes(" ")) {
    errors.password = "Remove the space";
  }

  return errors;
}

export function UploadValidation(values) {
  const errors = {};
  if (!values.description) {
    errors.name = "Required";
  }

  // else if (values.name.length < 3) {
  //   errors.name = "Must be greater than 2 and less than 17";
  // }

  if (!values.gestImage) {
    errors.gestImage = "";
  }

  return errors;
}

export function updateValidate(values) {
  const errors = {};
  if (!values.description) {
    errors.description = "required";
  } else if (!values.gestImage) {
    errors.gestImage = "required";
  }
  return errors;
}
