"use client"
import React, { useState, useCallback, useEffect } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import dynamic from 'next/dynamic';

const AttachmentButtonLarge = ({ files, setFiles }) => {
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState([]);
  const [heic2any, setHeic2any] = useState(null);

  useEffect(() => {
    import('heic2any').then(module => setHeic2any(() => module.default));
  }, []);

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp',
    'image/heic'
  ];

  const processFile = useCallback(async (file) => {
    if ((file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) && heic2any) {
      try {
        const jpegBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.7,
        });
        return new File([jpegBlob], file.name.replace(/\.heic$/i, '.jpg'), { type: 'image/jpeg' });
      } catch (error) {
        console.error('Error converting HEIC file:', error);
        throw new Error(`Error processing ${file.name}. Please try another file.`);
      }
    }
    return file;
  }, [heic2any]);

  const convertToBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          name: file.name,
          type: file.type,
          content: reader.result.split(',')[1]
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileChange = useCallback(async (event) => {
    const selectedFiles = Array.from(event.target.files);

    const validFiles = selectedFiles.filter(
      (file) =>
        (allowedTypes.includes(file.type) || file.name.toLowerCase().endsWith('.heic')) &&
        file.size <= 8 * 1024 * 1024 // 8MB max size
    );

    if (selectedFiles.length > 3 || (files.length + validFiles.length > 3)) {
      setError('You can attach a maximum of 3 files.');
      return;
    }

    setError('');
    setProcessing(validFiles.map(file => file.name));

    const processFiles = async () => {
      const processedFiles = await Promise.all(validFiles.map(async (file) => {
        const processed = await processFile(file);
        const base64 = await convertToBase64(processed);
        setProcessing(prev => prev.filter(name => name !== file.name));
        return base64;
      }));

      setFiles(prevFiles => [...prevFiles, ...processedFiles].slice(0, 3));
    };

    processFiles().catch(error => {
      setError(error.message);
      setProcessing([]);
    });
  }, [files, setFiles, processFile, convertToBase64]);

  const handleDeleteFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = e.dataTransfer.files;
    handleFileChange({ target: { files: droppedFiles } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className='w-full flex flex-col justify-center cursor-pointer py-8'>
      <div
        className="w-full h-full flex flex-col items-center justify-center relative p-8"
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDrop={handleDrop}
      >
        <label htmlFor="file-input" className='relative w-full flex flex-col items-center'>
          <div className="flex flex-row items-center justify-end">
            <AttachFileIcon fontSize="medium" />
            <span className="text-[20px] al:font-semibold sl:font-semibold font-bold text-black pl-[14px]">Add attachments</span>
          </div>
          <span className="text-xs text-gray-500">3 max.</span>
        </label>
        <input
          type="file"
          id="file-input"
          multiple
          accept=".pdf, .doc, .docx, .txt, .jpg, .jpeg, .png, .gif, .bmp, .webp, .heic"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
        {processing.length > 0 && (
          <div className="mt-2 text-gray-600 text-sm flex items-center">
            <svg className="animate-spin h-4 w-4 mr-2 border-t-2 border-r-2 border-gray-300 rounded-full" viewBox="0 0 24 24">
            </svg>
            Processing: {processing.join(', ')}
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className='flex px-3 pt-1 border-t-2 border-dashed border-gray-300'>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="flex justify-between items-center mt-2 text-sm text-gray-700">
                <span className="truncate">{file.name}</span>
                <button onClick={() => handleDeleteFile(index)} className="ml-2 text-red-600 font-bold">&times;</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(AttachmentButtonLarge), { ssr: false });