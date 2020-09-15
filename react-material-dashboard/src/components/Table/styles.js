import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.only('xs')]: {
      height: '100%'
    }
  },
  content: {
    padding: 0
  },
  inner: {
    padding: 5
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  toolbar: {
    padding: 20
  }
}));

export default useStyles;
