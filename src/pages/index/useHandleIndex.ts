import { useSelector } from 'react-redux';
import { useActions } from '@/hooks/gm-react-hanger/useActions';
import { countActions, COUNT, State } from '@/models/countModel';

const useHandleIndex = () => {
  const disPatch = useActions(countActions);

  const count = useSelector<any, State>(state => state[`${COUNT}`]);

  return { count, disPatch };
};

export default useHandleIndex;
