import { createTheme } from '@mui/material/styles';


export const mainContainerCss = {
    boxShadow: '5',
    marginY: '35px',
    alignItems: 'center',
    display: 'flex',
    width: '70%',
    borderRadius: '5px',
    padding: "50px",
    background: 'linear-gradient(to bottom,#fefeff,#eee )'
}
export const headingCss = {
    marginTop: '10px',
    marginBottom: '20px',
    fontWeight: 'bold'

}
export const innerContainer = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '60vh'
}
export const addMarginX = {
    marginX: '20px'
}
export const addMarginY = {
    marginY: '10px'
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