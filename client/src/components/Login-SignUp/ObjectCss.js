import { createTheme } from '@mui/material/styles';
// Login css 
export const mainContainerCss = {
    boxShadow: '5',
    marginY: '35px',
    alignItems: 'center',
    display: 'flex',
    width: '70%',
    borderRadius: '5px',
    paddingY: "50px",
    background: 'linear-gradient(to bottom,#fefeff,#eee )'
}
export const smallContainerCss = {
    boxShadow: '5',
    marginY: '20px',
    alignItems: 'center',
    display: 'flex',
    width: '90%',
    borderRadius: '5px',
    paddingY: "50px",
    background: 'linear-gradient(to bottom,#fefeff,#eee )',
}
export const innerContainer = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '40vh'
}
export const headingCss = {
    marginTop: '10px',
    marginBottom: '20px',
    fontWeight: 'bold'

}
export const phoneHeadingCss = {
    marginTop: '10px',
    marginBottom: '20px',
    textAlign: 'center',

}
export const addMarginX = {
    marginX: '20px'
}
export const addMarginY = {
    marginY: '20px'
}
export const forgotPass = {
    paddingTop: '10px',
    textAlign: 'end',
}
export const theme = createTheme({
    palette: {
        neutral: {
            main: '#232323',
            contrastText: '#fff',
        },
    },
});

//Register Css

export const firstContainer = {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    height: '60vh'
}
export const lastContainer = {
    marginTop: "30px",
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
}