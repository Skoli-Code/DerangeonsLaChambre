import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey300,grey900,indigo500 } from 'material-ui/styles/colors';
const theme = getMuiTheme({
  fontFamily:'Lato',
  palette: {
    primary1Color:grey300,
    primary2Color:indigo500
  },
  appBar: {
    height: 50,
    color: grey300
  },
  tabs: {
    backgroundColor: grey300,
    textColor: grey900,
    selectedTextColor: indigo500,
  }
});
export default theme;
