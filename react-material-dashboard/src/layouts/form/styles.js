import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  // div: {
  //   top: 44,
  //   // [theme.breakpoints.up('sm')]: {
  //   //   top: 64
  //   // },
  //   backgroundColor: theme.palette.primary.main,
  //   background: theme.palette.primary.main,
  //   zIndex: 5,
  //   boxShadow: 'none'
  // },
  root: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3)
    }
  },
  form: {
    width: '100%'
  },
  content: {
    marginTop: theme.spacing(0)
  }
}));

export default useStyles;
