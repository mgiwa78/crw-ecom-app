// import { useEffect } from "react/cjs/react.development";
// import { getRedirectResult } from "firebase/auth";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
  //   auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  //   useEffect(async () => {
  //     const responce = await getRedirectResult(auth);
  //     console.log(responce);

  //     if (responce) {
  //       createUserDocumentFromAuth(responce.user);
  //     }
  //   }, []);
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in With Google Pop-Up</button>
      <br />
      <SignUpForm />
    </div>
  );
};

export default SignIn;
