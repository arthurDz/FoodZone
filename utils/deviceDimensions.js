import {Dimensions} from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

const REFERENCE_WIDTH = 360;
const REFERENCE_HEIGHT = 640;

export const setValueBasedOnWidth = dp => {
  if (typeof dp === 'number' && dp > 0)
    return Math.round((WIDTH * dp) / REFERENCE_WIDTH);
  return dp;
};

export const setValueBasedOnHeight = dp => {
  if (typeof dp === 'number' && dp > 0)
    return Math.round((HEIGHT * dp) / REFERENCE_HEIGHT);
  return dp;
};
