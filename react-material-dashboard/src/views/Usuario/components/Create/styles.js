import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  fieldNumber: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingRight: 100,
      width: 450
    }
  },
  switch: {
    width: 280
  }
}));

export default useStyles;
