import { CardElement } from "@stripe/react-stripe-js";

import { useStripe, useElements } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASS } from "../custom-btn/custom-btn.component";
import {
  FormContainer,
  PaymentButton,
  PaymentFormContainer,
} from "./payment-form.styles";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { FormEvent, useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const paymentHnadler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    console.log(response);

    const {
      paymentIntent: { client_secret },
    } = response;
    console.log(client_secret);
    const cardDetails = elements.getElement(CardElement);
    if (cardDetails === null) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });
    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    }
    if (paymentResult.paymentIntent?.status === "succeeded") {
      alert("Payment Successfull");
    }
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHnadler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASS.inverted}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
