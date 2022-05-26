import { useState, useContext } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../custom-btn/custom-btn.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  auth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";
import { useDispatch } from "react-redux";
import { SignUpStart } from "../../store/user/user.action";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password === confirmPassword) return;
    try {
      dispatch(SignUpStart(email, password, displayName));

      // await createUserDocumentFromAuth(user, { displayName });

      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("email already in use");
      }
      console.error(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Dont have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit} action="">
        <FormInput
          label={"Display Name"}
          value={displayName}
          required
          type="text"
          name="displayName"
          onChange={handleChange}
        />
        <FormInput
          label={"Email"}
          required={true}
          type="email"
          value={email}
          name="email"
          onChange={handleChange}
        />
        <FormInput
          label={"Password"}
          value={password}
          required
          type="password"
          name="password"
          onChange={handleChange}
        />
        <FormInput
          label={"Confirm Password"}
          type="password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
