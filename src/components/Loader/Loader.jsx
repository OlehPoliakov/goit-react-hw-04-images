import { MdOutlineCameraswitch } from 'react-icons/md';
import s from './Loader.module.css';

export default function Loader() {
  return (
    <div className={s.wrapper}>
      <MdOutlineCameraswitch className={s.loader} />
    </div>
  );
}
