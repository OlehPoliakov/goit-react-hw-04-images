import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ description, smallImage, largeImage, openModal }) {
  return (
    <li className={s.ImageItem} onClick={openModal}>
      <img
        className={s.ImageItemImage}
        src={smallImage}
        alt={description}
        data-large={largeImage}
      />
    </li>
  );
}

// ImageGalleryItem.propTypes = {
//   description: PropTypes.string,
//   smallImage: PropTypes.string.isRequired,
//   largeImage: PropTypes.string.isRequired,
//   openModal: PropTypes.func.isRequired,
// };

export default ImageGalleryItem;
