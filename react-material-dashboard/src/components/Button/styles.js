import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core';

const useStyles = makeStyles(() => {
  const theme = createMuiTheme();
  return {
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    buttonProgress: {
      color: green[500]
    }
  };
});

export default useStyles;
