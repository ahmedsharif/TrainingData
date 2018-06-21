// import BankForm from 'react-payment';
 
// onSubmit(account) {
//   const { name, accountNumber, routingNumber, accountType } = account;
//   const account_holder_type = accountType === 'personal' ? 'individual' : 'company';
 
//   Stripe.bankAccount.createToken({
//     country: 'US',
//     currency: 'USD',
//     routing_number: routingNumber,
//     account_number: accountNumber,
//     account_holder_name: name,
//     account_holder_type
//   }, (status, response) => {
//     if (response.error) {
//       alert('Adding bank account failed with error: ' + response.error.message);
//     } else {
//       const bankAccountToken = response.id;
//       console.log(bankAccountToken);
//       // send bankAccountToken to server to be saved under the current user
//       // show success message and navigate away from form
//     }
//   });
// }
 
// <BankForm
//   onSubmit={this.onSubmit}
// />