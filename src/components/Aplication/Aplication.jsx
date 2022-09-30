import { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

import fetchImages from '../../api/api-services';

// Компонент
export default function Aplication() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState(null);

  // Получает данные из фетча
  const getImages = async () => {
    setIsLoading(true);

    try {
      const { hits } = await fetchImages(searchQuery, page);

      setImages(prev => [...prev, ...hits]);

      if (page > 1) {
        scrollOnLoadButton();
      }

      if (hits.length) {
        toast.success(`Hooray! We found ${hits.length} images.`, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.info(
          `Sorry, there are no ${searchQuery} images matching your search query. Please try again.`,
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } catch (error) {
      console.log('Smth wrong with App fetch', error);
      setError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  // Запрос за картинками при обновлении инпута
  useEffect(() => {
    if (!searchQuery) return;

    getImages();
    // eslint-disable-next-line
  }, [searchQuery, page]);

  // Принимает с формы запрос и пишет в стейт + сбрасывает после отправки стейт
  const onChangeQuery = useCallback(
    query => {
      if (query === searchQuery) {
        return;
      }
      setImages([]);
      setPage(1);
      setSearchQuery(query);
      setIsLoading(false);
      setModal(false);
      setLargeImage('');
      setError(null);
    },
    [searchQuery]
  );

  // Получает полное изображение, пишет его в стейт и открывает модалку
  const handleGalleryItem = useCallback(fullImageUrl => {
    setLargeImage(fullImageUrl);
    setModal(true);
  }, []);

  // Переключение модалки
  const toggleModal = useCallback(() => {
    setModal(prevModal => !prevModal);
  }, []);

  // Скролл при клике на кнопку
  const scrollOnLoadButton = () => {
    const { scrollTop, clientHeight } = document.documentElement;

    window.scrollTo({
      top: scrollTop + clientHeight,
      behavior: 'smooth',
    });
  };

  const needToShowLoadMore = images.length > 0 && images.length >= 12;

  return (
    <>
      <Searchbar onSearch={onChangeQuery} />

      {images.length < 1 && (
        <Message>
          <h2>The gallery is empty 🙁</h2>
          <p>Use search field!</p>
        </Message>
      )}

      <ImageGallery images={images} onImageClick={handleGalleryItem} />

      {isLoading ? (
        <Loader />
      ) : (
        needToShowLoadMore && (
          <Button
            onClick={() => {
              setPage(page + 1);
            }}
          />
        )
      )}

      {error && (
        <Message>
          <h2>Oops! 😫</h2>
          <p>
            Sorry, something went wrong. Please try again, or{' '}
            <a href="/">refresh the page</a>.
          </p>
        </Message>
      )}

      {modal && (
        <Modal onClose={toggleModal}>
          <div className="Close-box">
            <IconButton onClick={toggleModal} aria-label="Close modal window">
              <CloseIcon width="20px" height="20px" fill="#02be6e" />
            </IconButton>
          </div>
          <img src={largeImage} alt="" className="Modal-image" />
        </Modal>
      )}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
