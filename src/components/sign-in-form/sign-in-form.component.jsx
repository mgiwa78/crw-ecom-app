import { useState, useContext } from "react";

import { BUTTON_TYPE_CLASS } from "../custom-btn/custom-btn.component";

import Button from "../custom-btn/custom-btn.component";
import FormInput from "../form-input/form-input.component";

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import { useDispatch } from "react-redux";
import "./sign-in-form.styles.scss";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";
import { signInWithEmail } from "../../store/user/user.saga";
const defaultFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFields);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
    const resetFormFields = () => {
      setFormFields(defaultFields);
    };
  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
    resetFormFields();
  };

  const { email, password } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
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
