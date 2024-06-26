import React from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

interface FileUploadProps {
  acceptedFileTypes?: string; // Accepted file types (e.g., 'image/*')
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  title?: string
}

const FileUpload: React.FC<FileUploadProps> = ({ files, setFiles,title="فایل های ضمیمه را انتخاب کنید" }) => {


  const onDrop = (acceptedFiles: File[]) => {
    if (files.length > 1) {
      toast.error("امکان آپلود بیش از 2 ضمیمه وجود ندارد")
    } else {
        setFiles([...files, ...acceptedFiles]);

        if (acceptedFiles.length === 0) {
          toast.error("سایز فایل بیش از 200kb می باشد")
        }    
    }

  };

  const removeFile = (file: File) => {
    const updatedFiles = files.filter((f) => f !== file);
    setFiles(updatedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg', '.Jpeg', '.JPG'],
      'image/png': ['.png', '.Png', '.PNG'],
    },
    maxSize: 209600, // 60KB in bytes (1KB = 1024 bytes)
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-4 border-gray-300"
      >
        <input {...getInputProps()} />
        <span>{title}</span>
      </div>
      <div>
        <span className="pt-4">فایل های انتخاب شده:</span>
        <ul className="mt-8 flex gap-x-4">
          {files.map((file, index) => (
            <li className="text-xl " key={index}>
              {/* {file.name} */}
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{ maxWidth: '100%', maxHeight: '100px' }}
              />
              <button
                className="pr-16"
                onClick={() => removeFile(file)}
              >
                <span className="text-red-500">حذف</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;
