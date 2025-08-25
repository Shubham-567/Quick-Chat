import "./ImageModal.css";
import { Download, X } from "lucide-react";

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!isOpen) return null;

  const handleDownloadImage = async () => {
    const response = await fetch(image);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `image_${Date.now()}.jpg`;
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='image-modal'>
      <div className='image-modal-content'>
        <div className='image-modal-header'>
          <h2 className='text-xl md:text-2xl font-semibold text-card-foreground'>
            Image Preview
          </h2>
          <button onClick={onClose} className='image-modal-header-close'>
            <X className='size-6' />
          </button>
        </div>
        <div className='image-modal-body'>
          <img
            src={image}
            alt='Selected Image'
            className='image-modal-body img'
          />
        </div>
        <div className='image-modal-footer'>
          <button
            onClick={handleDownloadImage}
            className='image-modal-footer-download'>
            <Download className='size-5 mr-2' />
            Download Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
