import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttonProgress: {
    color: green[500]
  }
}));

export default useStyles;
