import React from 'react';
// import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FallingLines } from 'react-loader-spinner';
import { Box } from './Box';
import { Container } from './App.styled';
import fetchImages from '../services/ImgAPI';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
// import Loader from './Loader/Loader';

export default class App extends React.Component {
  state = {
    query: '',
    page: 1,
    imagesOnPage: 0,
    totalImages: 0,
    isLoading: false,
    showModal: false,
    images: null,
    error: null,
    currentImageUrl: null,
    currentImageDescription: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    const prevName = prevState.query;
    const nextName = query;

    if (prevName !== nextName) {
      this.setState({ isLoading: true });

      fetchImages(query)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          if (hits.length > 0) {
            toast.success(`Hooray! We found ${hits.length} images.`, {
              position: 'top-right',
              autoClose: 800,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            });
          }

          return this.setState({
            page: 1,
            images: imagesArray,
            imagesOnPage: imagesArray.length,
            totalImages: totalHits,
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: true }));
    }

    if (prevState.page !== page && page !== 1) {
      this.setState({ isLoading: true });

      fetchImages(query, page)
        .then(({ hits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState(({ images, imagesOnPage }) => {
            return {
              images: [...images, ...imagesArray],
              imagesOnPage: imagesOnPage + imagesArray.length,
            };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: true }));
    }
  }

  handleSearchFormSubmit = query => {
    this.setState({ query });
  };

  onNextFetch = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currentImageDescription: currentImageDescription,
      }));
    }
  };

  render() {
    const {
      images,
      isLoading,
      error,
      imagesOnPage,
      totalImages,
      showModal,
      currentImageUrl,
      currentImageDescription,
    } = this.state;

    const handleSearchFormSubmit = this.handleSearchFormSubmit;
    const onNextFetch = this.onNextFetch;
    const openModal = this.openModal;
    const toggleModal = this.toggleModal;

    return (
      <Container>
        <Box pb={20}>
          <Searchbar onSubmit={handleSearchFormSubmit} />

          {images && <ImageGallery images={images} openModal={openModal} />}

          {error && console.log(error.message)}

          <Box display="flex" justifyContent="center">
            {isLoading && (
              <FallingLines
                color="#4fa94d"
                width="100"
                visible={true}
                ariaLabel="falling-lines-loading"
              />
            )}
          </Box>

          {imagesOnPage >= 12 && imagesOnPage < totalImages && (
            <Button onNextFetch={onNextFetch} />
          )}

          {/* {showModal && (
            <Modal
              onClose={toggleModal}
              currentImageUrl={currentImageUrl}
              currentImageDescription={currentImageDescription}
            />
          )} */}

          <ToastContainer />
        </Box>
      </Container>
    );
  }
}
