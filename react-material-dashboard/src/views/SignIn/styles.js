import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75vh'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  buttonProgress: {
    color: green[500]
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  }
}));

export default useStyles;
