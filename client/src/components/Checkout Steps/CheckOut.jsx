import React from 'react';
import "./CheckOut.css"
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PaidIcon from '@mui/icons-material/Paid';
import { Step, StepLabel, Stepper } from '@mui/material';

const steps = [
    {
        label: "Shipping Details",
        icon: <LocalShippingIcon />
    },
    {
        label: "Confirm Order",
        icon: <DoneAllIcon />
    },
    {
        label: "Payment",
        icon: <PaidIcon />
    }
]

const CheckOut = ({ step }) => {
    return <>
        <Stepper activeStep={step} alternativeLabel>
            {steps.map((curStep, index) => (
                <Step key={index} active={step === index ? true : false} completed={step > index ? true : false}>
                    <StepLabel icon={curStep.icon} style={{ color: step >= index ? "#008000" : "rgba(0,0,0,0.4)" }} >{curStep.label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    </>;
};

export default CheckOut;
