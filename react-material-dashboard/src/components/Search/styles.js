import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(1)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 2, 0)
    },
    outline: 'none'
  },
  div_paper: {
    outline: 'none'
  }
}));

export default useStyles;
