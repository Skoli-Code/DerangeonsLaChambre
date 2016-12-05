import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey300,grey900,blue500, blue200 } from 'material-ui/styles/colors';
const darkGray = grey900;
const theme = getMuiTheme({
  fontFamily:'Lato',
  palette: {
    primary1Color:darkGray,
    primary2Color:blue500
  },
  appBar: {
    height: 50,
    color: darkGray
  },
  tabs: {
    backgroundColor: darkGray,
    textColor: 'white',
    selectedTextColor: blue200,
  }
});
export default theme;
