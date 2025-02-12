import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

const useDimensions = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = ({window}) => {
      setDimensions(window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  return dimensions;
};

export default useDimensions;
