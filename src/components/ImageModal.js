import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(0,0,0,0.8)',
  border: '2px solid #000',
  boxShadow: 24,
  width: '70vw',
};
const closeImg = {
  cursor:'pointer',
  color: 'red',
  float: 'right',
  right: '100%',
  marginTop: '5px',
  width: '20px',
  position: 'absolute',
  display: 'block',
  right: 0,
};
const imageStyle = {
  width: '100%',
};

const ImageModal = ({ image, isModalOpen, handleCloseModal }) => (
  <Modal
    open={isModalOpen}
    onClose={handleCloseModal}
    aria-labelledby='modal-modal-title'
    aria-describedby='modal-modal-description'
    data-testid='imageModal'
  >
    <Box sx={style}>
      <CancelIcon style={closeImg} onClick={handleCloseModal} />
      <img src={image} style={imageStyle}/>
    </Box>
  </Modal>
);

export default ImageModal;