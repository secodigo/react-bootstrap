import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(1)
  },
  error: {
    fontSize: 14,
    marginTop: 1,
    color: 'red'
  }
}));

export default useStyles;
