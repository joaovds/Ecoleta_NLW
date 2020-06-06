import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { FiUpload } from 'react-icons/fi';

import './style.css';

interface Iprops {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Iprops> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt='Upload' />
      ) : isDragActive ? (
        <p>
          <FiUpload />
          Solte o arquivo aqui...
        </p>
      ) : (
        <p>
          <FiUpload />
          Clique ou arraste aqui para fazer upload da imagem do seu
          estabelecimento!
        </p>
      )}
    </div>
  );
};

export default Dropzone;
