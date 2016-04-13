import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#6597AF',//Colors.cyan500,
    primary2Color: '#AAC3Cf', //'#A8B3B8',
    primary3Color: Colors.lightBlack,
    backgroundColor: '#EFEFEF',
    accent1Color: '#EC9D5B',
    accent2Color: '#ECBF64',
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    textColorMuted: ColorManipulator.fade(Colors.darkBlack, 0.8),
    alternateTextColor: Colors.white,
    alternateTextColorMuted: ColorManipulator.fade(Colors.white, 0.8),
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.cyan500,
  }
};
