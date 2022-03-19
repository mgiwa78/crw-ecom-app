// import { useEffect } from "react/cjs/react.development";
// import { getRedirectResult } from "firebase/auth";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import "./authentication.styles.scss";

import {
  //   auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const Authentication = () => {
  //   useEffect(async () => {
  //     const responce = await getRedirectResult(auth);
  //     console.log(responce);

  //     if (responce) {
  //       createUserDocumentFromAuth(responce.user);
  //     }
  //   }, []);

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
