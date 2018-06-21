import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

// export default class TakeMoney extends React.Component {
//     onToken = (token) => {
//       fetch('/save-stripe-token', {
//         method: 'POST',
//         body: JSON.stringify(token),
//       }).then(response => {
//         response.json().then(data => {
//           alert(`We are in business, ${data.email}`);
//         });
//       });
//     }
   
//     render() {
//       return (
//         // ...
//         <StripeCheckout
//           token={this.onToken}
//           stripeKey="my_PUBLISHABLE_stripekey"
//         />
//       )
//     }
//   }

class PaymentRequestForm extends React.Component {
    constructor(props) {
      super(props);
  
      // For full documentation of the available paymentRequest options, see:
      // https://stripe.com/docs/stripe.js#the-payment-request-object
      const paymentRequest = props.stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Demo total',
          amount: 1000,
        },
      });
  
      paymentRequest.on('token', ({complete, token, ...data}) => {
        console.log('Received Stripe token: ', token);
        console.log('Received customer information: ', data);
        complete('success');
      });
  
      paymentRequest.canMakePayment().then((result) => {
        this.setState({canMakePayment: !!result});
      });
  
      this.state = {
        canMakePayment: false,
        paymentRequest,
      };
    }
  
    render() {
      return this.state.canMakePayment ? (
        <PaymentRequestButtonElement
          paymentRequest={this.state.paymentRequest}
          className="PaymentRequestButton"
          style={{
            // For more details on how to style the Payment Request Button, see:
            // https://stripe.com/docs/elements/payment-request-button#styling-the-element
            paymentRequestButton: {
              theme: 'light',
              height: '64px',
            },
          }}
        />
      ) : null;
    }
  }
  export default injectStripe(PaymentRequestForm);