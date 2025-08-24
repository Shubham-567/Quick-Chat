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
    <div className='fixed top-0 left-0 w-full h-full bg-black/6 flex justify-center items-center z-50'>
      <div className='bg-background text-foreground rounded-2xl shadow-2xl p-4 max-w-lg w-full'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold text-card-foreground'>
            Image Preview
          </h2>
          <button
            onClick={onClose}
            className='text-muted hover:text-primary transition-colors cursor-pointer'>
            <X className='size-6' />
          </button>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <img
            src={image}
            alt='Selected Image'
            className='w-full h-full object-contain rounded-2xl'
          />
        </div>
        <div className='flex justify-center items-center mt-4'>
          <button
            onClick={handleDownloadImage}
            className='bg-primary text-primary-foreground font-medium py-2 px-4 rounded-lg transition-colors flex items-center cursor-pointer hover:bg-primary/80'>
            <Download className='w-5 h-5 mr-2' />
            Download Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
