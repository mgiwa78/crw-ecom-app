import { useState, useContext } from "react";

import { BUTTON_TYPE_CLASS } from "../custom-btn/custom-btn.component";

import Button from "../custom-btn/custom-btn.component";
import FormInput from "../form-input/form-input.component";

import {
  auth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";
const defaultFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFields);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const { email, password } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorect Password");
          break;
        case "auth/user-not-found":
          alert("invalid user");
          break;

        default:
          console.error(error);
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSubmit} action="">
        <FormInput
          label={"Email"}
          value={email}
          required
          type="emial"
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
        <div className="buttons-container">
          <Button type="submit"> Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.google}
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
