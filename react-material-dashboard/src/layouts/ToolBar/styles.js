import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  div: {
    top: 44,
    // [theme.breakpoints.up('sm')]: {
    //   top: 64
    // },
    backgroundColor: theme.palette.primary.main,
    background: theme.palette.primary.main,
    zIndex: 100,
    boxShadow: 'none',
    height: 44,
    justifyContent: 'center'
  }
}));

export default useStyles;
