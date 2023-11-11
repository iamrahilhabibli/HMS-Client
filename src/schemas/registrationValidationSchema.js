import * as Yup from "yup";

export const registrationValidationSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "First name must contain only letters")
    .max(30, "First name must have a maximum length of 30 characters")
    .required("Required"),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Last name must contain only letters")
    .max(50, "Last name must have a maximum length of 50 characters")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must contain at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[0-9]/, "Password must contain at least one digit.")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character."
    )
    .required("Required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  role: Yup.number().required("Role is required"),
});
