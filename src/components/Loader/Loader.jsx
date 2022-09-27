import { FallingLines } from 'react-loader-spinner';

import styles from './Loader.module.scss';

const Loader = () => (
  <div className={styles.Loader}>
    <FallingLines
      color="#4fa94d"
      width="100"
      visible={true}
      ariaLabel="falling-lines-loading"
    />
  </div>
);

export default Loader;
