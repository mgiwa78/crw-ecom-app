import { useState } from "react/cjs/react.development";

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
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const responce = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(responce);
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

  const [formFields, setFormFields] = useState(defaultFields);

  const handleChange = (event) => {
    console.log(formFields);
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  const { email, password } = formFields;

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
            buttonType={"google"}
            onClick={signInWithGoogle}
          >
            {" "}
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
