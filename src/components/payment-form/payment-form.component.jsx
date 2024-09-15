import React,{useEffect} from 'react'
import Button, {BUTTON_TYPE_CLASSES } from '../button/button.component'
import { PaymentContainer, FormContainer } from './payment-form.styles'
import RzPay from '../../utils/payment/razorPay';

function PaymentForm({Total}) {

    const loadScript = src => new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            console.log('razorpay loaded successfully');
            resolve(true);
        };
        script.onerror = () => {
            console.log('error in loading razorpay');
            resolve(false);
        };
        document.body.appendChild(script);
    });
    const handleSubmit = async(event)=>{
        event.preventDefault();
       
        var options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            key_secret: process.env.REACT_APP_RAZORPAY_SECRET,
            amount : Total,
            currency :"INR",
            name:"Dress-Shop",
            description:"Testing",
            handler:(response)=>{
                console.log(response.razorpay_payment_id);
            },
            prefill:{
                name :"customer",
                email : "customer@gmail.com",
                contact :"1234567890"
            },
            theme:{
                color: "#3399cc"
            }
        };

        var pay = new window.RazorPay(options)
        pay.open()
    }

    useEffect(()=>{
        const load = async()=>{
            const res = await loadScript(
                'https://checkout.razorpay.com/v1/checkout.js',
              );
              if (!res) {
                console.log('Razorpay SDK failed to load. Are you online?');
              }
        }
       load();
       const existingScript = document.querySelector(`script[src="https://checkout.razorpay.com/v1/checkout.js"]`);
       console.log(existingScript)
    },[])

  return (
    <PaymentContainer>
        <FormContainer onSubmit={handleSubmit}>
            payment
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay Now </Button>
        </FormContainer>
    </PaymentContainer>
  )
}

export default PaymentForm