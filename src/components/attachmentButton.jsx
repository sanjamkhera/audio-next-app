"use client"

import React, { useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const AttachmentButton = ({ files, setFiles }) => {
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles.filter(
      (file) =>
        ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(file.type) &&
        file.size <= 5 * 1024 * 1024
    );

    const totalFiles = [...files, ...validFiles].slice(0, 3);

    if (selectedFiles.length > 3 || (files.length + validFiles.length > 3)) {
      setError('You can attach a maximum of 3 files.');
    } else {
      setError(''); // Clear error message if the selection is valid
    }

    setFiles(totalFiles); // Update state with the new list of files, limited to 3
  };

  return (
    <div className="relative">
      <input
        type="file"
        id="file-input"
        multiple
        accept=".pdf, .doc, .docx, .txt"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <label htmlFor="file-input" className="block">
        <div className="w-full min-w-[315px] xs:h-[48px] h-[60px] xm:h-[70px] px-4 rounded-lg flex items-center justify-between font-semibold text-lg ring-2 ring-inset ring-gray-300 cursor-pointer">
          <div className="flex flex-nowrap items-center justify-between ">
            <AttachFileIcon fontSize="medium" />
            <div className="pl-3 font-bold text-[20px] xs:text-[18px] whitespace-nowrap">
              Add attachments <span className="font-medium text-[12px]">{files.length > 0 ? `(${files.length}/3)` : ''}</span>
            </div>
          </div>
          <div className="pl-3 text-sm font-medium whitespace-nowrap">3 max.</div>
        </div>
      </label>
      {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
    </div>
  );
};

export default AttachmentButton;
