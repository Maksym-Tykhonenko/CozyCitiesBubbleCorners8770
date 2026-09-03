import React from 'react';
import Svg, { Path, Circle, Line, Rect, Polyline } from 'react-native-svg';

export type IconName =
  | 'pin'
  | 'map'
  | 'bulb'
  | 'grid'
  | 'palette'
  | 'back'
  | 'search'
  | 'heart'
  | 'heart-filled'
  | 'check'
  | 'plus'
  | 'pause'
  | 'close'
  | 'expand'
  | 'route'
  | 'sun'
  | 'download'
  | 'lock';

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

/**
 * Lightweight line-icon set drawn with react-native-svg. Icons share a 24x24
 * viewBox and a rounded, friendly stroke style to match the app's soft look.
 */
const Icon: React.FC<Props> = ({ name, size = 24, color = '#0E4952', strokeWidth = 2 }) => {
  const common = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none' as const,
  };

  const body = () => {
    switch (name) {
      case 'pin':
        return (
          <>
            <Path d="M12 21c4.5-4.2 7-7.6 7-11a7 7 0 1 0-14 0c0 3.4 2.5 6.8 7 11z" {...common} />
            <Circle cx={12} cy={10} r={2.6} {...common} />
          </>
        );
      case 'map':
        return (
          <>
            <Path d="M9 4 3.5 6.2v13.3L9 17.3l6 2.2 5.5-2.2V4L15 6.2 9 4z" {...common} />
            <Line x1={9} y1={4} x2={9} y2={17.3} {...common} />
            <Line x1={15} y1={6.2} x2={15} y2={19.5} {...common} />
          </>
        );
      case 'bulb':
        return (
          <>
            <Path d="M9 18h6M10 21h4" {...common} />
            <Path d="M12 3a6 6 0 0 0-3.8 10.7c.5.4.8 1 .8 1.6V16h6v-.7c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3z" {...common} />
          </>
        );
      case 'grid':
        return (
          <>
            <Rect x={4} y={4} width={7} height={7} rx={1.6} {...common} />
            <Rect x={13} y={4} width={7} height={7} rx={1.6} {...common} />
            <Rect x={4} y={13} width={7} height={7} rx={1.6} {...common} />
            <Rect x={13} y={13} width={7} height={7} rx={1.6} {...common} />
          </>
        );
      case 'palette':
        return (
          <>
            <Path d="M12 3a9 9 0 0 0 0 18c1.3 0 2-1 2-2 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.1 0-1 .8-1.7 1.8-1.7H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7z" {...common} />
            <Circle cx={7.5} cy={11} r={1} fill={color} stroke="none" />
            <Circle cx={10} cy={7.5} r={1} fill={color} stroke="none" />
            <Circle cx={14} cy={7.5} r={1} fill={color} stroke="none" />
            <Circle cx={16.5} cy={11} r={1} fill={color} stroke="none" />
          </>
        );
      case 'back':
        return (
          <>
            <Line x1={20} y1={12} x2={4} y2={12} {...common} />
            <Polyline points="10,6 4,12 10,18" {...common} />
          </>
        );
      case 'search':
        return (
          <>
            <Circle cx={11} cy={11} r={7} {...common} />
            <Line x1={16} y1={16} x2={21} y2={21} {...common} />
          </>
        );
      case 'heart':
      case 'heart-filled':
        return (
          <Path
            d="M12 20.5S3.5 14.7 3.5 8.9A4.6 4.6 0 0 1 12 6.2a4.6 4.6 0 0 1 8.5 2.7c0 5.8-8.5 11.6-8.5 11.6z"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={name === 'heart-filled' ? color : 'none'}
          />
        );
      case 'check':
        return <Polyline points="5,13 10,18 19,6" {...common} />;
      case 'plus':
        return (
          <>
            <Line x1={12} y1={5} x2={12} y2={19} {...common} />
            <Line x1={5} y1={12} x2={19} y2={12} {...common} />
          </>
        );
      case 'pause':
        return (
          <>
            <Line x1={9} y1={5} x2={9} y2={19} {...common} />
            <Line x1={15} y1={5} x2={15} y2={19} {...common} />
          </>
        );
      case 'close':
        return (
          <>
            <Line x1={6} y1={6} x2={18} y2={18} {...common} />
            <Line x1={18} y1={6} x2={6} y2={18} {...common} />
          </>
        );
      case 'expand':
        return (
          <>
            <Polyline points="9,4 4,4 4,9" {...common} />
            <Polyline points="15,20 20,20 20,15" {...common} />
            <Line x1={4} y1={4} x2={10} y2={10} {...common} />
            <Line x1={20} y1={20} x2={14} y2={14} {...common} />
          </>
        );
      case 'route':
        return (
          <>
            <Circle cx={6} cy={18} r={2.4} {...common} />
            <Circle cx={18} cy={6} r={2.4} {...common} />
            <Path d="M8.2 17.2C13 15.5 15 12 15.8 8.4" {...common} strokeDasharray="1.5 2.5" />
          </>
        );
      case 'sun':
        return (
          <>
            <Circle cx={12} cy={12} r={4} {...common} />
            <Line x1={12} y1={3} x2={12} y2={5} {...common} />
            <Line x1={12} y1={19} x2={12} y2={21} {...common} />
            <Line x1={3} y1={12} x2={5} y2={12} {...common} />
            <Line x1={19} y1={12} x2={21} y2={12} {...common} />
            <Line x1={5.6} y1={5.6} x2={7} y2={7} {...common} />
            <Line x1={17} y1={17} x2={18.4} y2={18.4} {...common} />
            <Line x1={5.6} y1={18.4} x2={7} y2={17} {...common} />
            <Line x1={17} y1={7} x2={18.4} y2={5.6} {...common} />
          </>
        );
      case 'download':
        return (
          <>
            <Line x1={12} y1={4} x2={12} y2={15} {...common} />
            <Polyline points="7,11 12,16 17,11" {...common} />
            <Path d="M5 19h14" {...common} />
          </>
        );
      case 'lock':
        return (
          <>
            <Rect x={5} y={11} width={14} height={9} rx={2} {...common} />
            <Path d="M8 11V8a4 4 0 0 1 8 0v3" {...common} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {body()}
    </Svg>
  );
};

export default Icon;
