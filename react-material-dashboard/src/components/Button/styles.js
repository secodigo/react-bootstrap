import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(() => {
  return {
    submit: {
      maxHeight: 30
    },
    buttonProgress: {
      color: green[500]
    }
  };
});

export default useStyles;
