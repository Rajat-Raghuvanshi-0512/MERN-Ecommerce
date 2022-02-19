import React, { useState } from 'react';
import { Country, State, City } from "country-state-city"
import countryTelephoneCode from "country-telephone-code";
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { mainContainerCss, innerContainer } from "./ObjectCss"
import CheckOut from '../Checkout Steps/CheckOut';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../Redux/Actions/cartAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Metadata from '../Metadata';


const Shipping = () => {

    const { shippingInfo } = useSelector(state => state.cart)

    const [country, setCountry] = useState(shippingInfo.country);
    const [state, setState] = useState(shippingInfo.state);
    const [city, setCity] = useState(shippingInfo.city);
    const [address, setAddress] = useState(shippingInfo.address);
    const [phoneCode, setPhoneCode] = useState("");
    const [phone, setPhone] = useState(shippingInfo.phone);


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (phone.length !== 10) {
            return toast.error("Enter a valid phone number")

        }
        dispatch(saveShippingInfo({ country, state, city, address, phone, phoneCode }))
        toast.success("Shipping details saved.")
        navigate("/order/confirm")
    }


    useEffect(() => {
        if (country) {
            setPhoneCode(`+${countryTelephoneCode(country)}`)
        }
    }, [country]);

    return <>
        <Metadata title="Shop Buddy | Shipping Details" />
        <Container sx={mainContainerCss}  >
            <CheckOut step={0} />
            <Container className='d-flex align-items-center'>
                <Container>
                    <img src={require("../../images/shipping.png")} alt="login " style={{ maxWidth: "100%", maxHeight: '100%' }} />
                </Container>
                <Container sx={innerContainer}>
                    <form onSubmit={handleSubmit}>
                        <Typography variant='h4' className="my-3">Shipping Details</Typography>
                        <Box className="my-3">
                            <FormControl fullWidth>
                                <InputLabel id="country" required>Country</InputLabel>
                                <Select
                                    labelId="country"
                                    value={country}
                                    label="country"
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                >
                                    {
                                        Country && Country.getAllCountries().map((c) => {
                                            return <MenuItem value={c.isoCode} key={c.isoCode}>{c.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        {
                            country && <>
                                <Box className="my-3">
                                    <FormControl fullWidth>
                                        <InputLabel id="state" required>State</InputLabel>
                                        <Select
                                            labelId="state"
                                            value={state}
                                            label="state"
                                            onChange={(e) => setState(e.target.value)}
                                            required
                                        >
                                            {
                                                State && State.getStatesOfCountry(country).map((s) => {
                                                    return <MenuItem value={s.isoCode} key={s.isoCode}>{s.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                            </>
                        }
                        {
                            state && <>
                                <Box className="my-3">
                                    <FormControl fullWidth>
                                        <InputLabel id="city" required>City</InputLabel>
                                        <Select
                                            labelId="city"
                                            id="city"
                                            value={city}
                                            label="Select City"
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                        >
                                            {
                                                City && City.getCitiesOfState(country, state).map((ci) => {
                                                    return <MenuItem value={ci.name} key={ci.name}>{ci.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                            </>
                        }
                        {
                            city &&
                            <TextField fullWidth id="outlined-basic" label="Address" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        }
                        {
                            city && <>
                                <Box className="mt-3 mb-4">
                                    <FormControl variant='standard'>
                                        <InputLabel id="phoneCode" ></InputLabel>
                                        <Select
                                            labelId="phoneCode"
                                            value={phoneCode}
                                            label="Enter phoneCode"
                                            onChange={(e) => setPhoneCode(e.target.value)}
                                        >
                                            <MenuItem value={phoneCode}>{phoneCode}</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField id="outlined-basic" type={"number"} label="Phone Number" variant="standard" value={phone} onChange={(e) => { setPhone(e.target.value) }} required />
                                </Box>
                            </>
                        }
                        <Button variant='contained' color='success' type='submit'>Continue</Button>
                    </form>
                </Container>
            </Container>
        </Container>
    </>;
};

export default Shipping;
