"use client"
import React, { useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const AttachmentButtonLarge = ({ files, setFiles }) => {
  // State to handle error messages
  const [error, setError] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    // Filter valid files based on type and size
    const validFiles = selectedFiles.filter(
      (file) =>
        ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(file.type) &&
        file.size <= 5 * 1024 * 1024 // 5MB max size
    );

    // Check if the total number of files exceeds the limit
    if (selectedFiles.length > 3 || (files.length + validFiles.length > 3)) {
      setError('You can attach a maximum of 3 files.');
      return;
    }

    setError('');

    // Convert valid files to base64
    const base64Files = validFiles.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            name: file.name,
            type: file.type,
            content: reader.result.split(',')[1] // Extract base64 content
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    // Update files state with new base64 encoded files
    Promise.all(base64Files).then(encodedFiles => {
      const updatedFiles = [...files, ...encodedFiles].slice(0, 3); // Limit to 3 files
      setFiles(updatedFiles);
    });
  };

  // Handle file delete
  const handleDeleteFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = e.dataTransfer.files;
    handleFileChange({ target: { files: droppedFiles } });
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className='w-full flex flex-col justify-center cursor-pointer py-8'>
      {/* Drag and drop area */}
      <div
        className="w-full h-full flex flex-col items-center justify-center relative p-8"
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Custom styled label acting as the visible button */}
        <label htmlFor="file-input" className='relative w-full flex flex-col items-center'>
          <div className="flex flex-row items-center justify-end">
            <AttachFileIcon fontSize="medium" />
            <span className="text-[20px] al:font-semibold sl:font-semibold font-bold text-black pl-[14px]">Add attachments</span>
          </div>
          <span className="text-xs text-gray-500">3 max.</span>
        </label>
        {/* Hidden file input */}
        <input
          type="file"
          id="file-input"
          multiple
          accept=".pdf, .doc, .docx, .txt"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {/* Error message display */}
        {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
      </div>

      {/* File list */}
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

export default AttachmentButtonLarge;