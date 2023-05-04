import { useActions } from 'gm-react-hanger';
import { useSelector } from 'react-redux';
import { countActions, COUNT, State } from '@/models/countModel';

const useHandleIndex = () => {
  const disPatch = useActions(countActions);

  const count = useSelector<any, State>(state => state[`${COUNT}`]);

  console.log(count);

  return { count, disPatch };
};

export default useHandleIndex;
