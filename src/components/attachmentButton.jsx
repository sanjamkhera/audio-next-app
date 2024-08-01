"use client"
import React, { useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const AttachmentButton = ({ files, setFiles }) => {
  // State to handle error messages
  const [error, setError] = useState('');

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
    } else {
      setError('');
    }
  
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

  return (
    <div className="relative w-full">
      {/* Hidden file input */}
      <input
        type="file"
        id="file-input"
        multiple
        accept=".pdf, .doc, .docx, .txt"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      {/* Custom styled label acting as the visible button */}
      <label htmlFor="file-input" className="block">
        <div className="w-full min-w-[315px] h-[60px] px-4 rounded-lg flex items-center justify-between font-semibold text-lg ring-2 ring-inset ring-gray-300 cursor-pointer">
          <div className="flex flex-nowrap items-center justify-between">
            <AttachFileIcon fontSize="medium" />
            <div className="pl-3 font-bold text-[20px] xs:text-[18px] whitespace-nowrap">
              Add attachments <span className="font-medium text-[12px]">{files.length > 0 ? `(${files.length}/3)` : ''}</span>
            </div>
          </div>
          <div className="pl-3 text-sm font-medium whitespace-nowrap">3 max.</div>
        </div>
      </label>
      {/* Error message display */}
      {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
    </div>
  );
};

export default AttachmentButton;