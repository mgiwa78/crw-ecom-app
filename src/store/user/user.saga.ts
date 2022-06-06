import { call, all, put, takeLatest } from "typed-redux-saga/macro";

import { USER_ACTION_TYPES } from "./user.action-types";

import {
  SignInSuccess,
  SignInFailed,
  SignUpFailed,
  SignUpSuccess,
  SignOutSuccess,
  SignOutFailed,
  EmailSignInStart,
  signInSuccess,
  signUpSuccess,
  signUpStart,
} from "./user.action";

import {
  AdditionalInfo,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signUserOut,
  UserData,
} from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { User } from "firebase/auth";

export function* getSnapShotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInfo
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    if (userSnapshot) {
      yield* put(
        SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    yield put(SignInFailed(error as Error));
  }
}
// export function* signUserUp(
//   userAuth,
//   { additionalInfo: { displayName, email } }
// ) {
//   try {
//     const userSnapshot = yield call(createUserDocumentFromAuth, userAuth);

//     yield put(SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
//   } catch (error) {
//     console.error(error);

//     yield put(SignUpFailed(error));
//     console.error(error);
//   }
// }

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapShotFromUserAuth, userAuth as User);
  } catch (error) {
    yield* put(SignInFailed(error as Error));
  }
}
export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield* put(SignInFailed(error as Error));
  }
}
export function* signInWithEmail({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapShotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(SignInFailed(error as Error));
  }
}
export function* signOut() {
  try {
    yield* call(signUserOut);
    yield* put(SignOutSuccess());
  } catch (error) {
    yield* put(SignOutFailed(error as Error));
  }
}
export function* userSignUp({
  payload: { email, password, displayName },
}: signUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      yield* put(SignUpSuccess(user, { displayName }));
    }
  } catch (error) {
    yield* put(SignUpFailed(error as Error));
  }
}
export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: signUpSuccess) {
  yield* call(getSnapShotFromUserAuth, user, additionalDetails);
}
export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSIION, isUserAuthenticated);
}
export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}
export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, userSignUp);
}
export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}
export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
