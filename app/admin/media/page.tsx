'use client';

import { useState, useRef } from 'react';
import { Upload, Trash2, Copy, Check } from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  path: string;
  size: number;
  uploadedAt: string;
}

export default function MediaManager() {
  const [media, setMedia] = useState<MediaItem[]>([
    {
      id: '1',
      name: 'celestial.jpg',
      path: '/images/celestial.jpg',
      size: 2048000,
      uploadedAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'earth.jpg',
      path: '/images/earth.jpg',
      size: 1856000,
      uploadedAt: '2024-01-14',
    },
    {
      id: '3',
      name: 'urban.jpg',
      path: '/images/urban.jpg',
      size: 1920000,
      uploadedAt: '2024-01-13',
    },
  ]);

  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadPath, setUploadPath] = useState('/images/');
  const [copied, setCopied] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      // Simulate upload (in production, upload to actual storage service)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newMedia: MediaItem = {
        id: Date.now().toString(),
        name: selectedFile.name,
        path: uploadPath + selectedFile.name,
        size: selectedFile.size,
        uploadedAt: new Date().toISOString().split('T')[0],
      };

      setMedia([newMedia, ...media]);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    setMedia(media.filter((item) => item.id !== id));
  };

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopied(path);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Media Manager</h1>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Upload New Media</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="path" className="block text-sm font-medium text-gray-900 mb-2">
              Upload Path
            </label>
            <input
              id="path"
              type="text"
              value={uploadPath}
              onChange={(e) => setUploadPath(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="/images/"
            />
            <p className="text-xs text-gray-600 mt-1">
              Example: /images/, /assets/hero/, /uploads/, etc. Allows admin to upload to ANY location on the site.
            </p>
          </div>

          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-900 mb-2">
              Select File
            </label>
            <div className="flex gap-4">
              <input
                ref={fileInputRef}
                id="file"
                type="file"
                onChange={handleFileSelect}
                accept="image/*"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Browse
              </button>
            </div>
            {selectedFile && <p className="text-sm text-green-600 mt-2">Selected: {selectedFile.name}</p>}
          </div>

          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            {uploading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
      </div>

      {/* Media Library */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">Media Library</h2>
          <p className="text-gray-600 text-sm mt-1">{media.length} files uploaded</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">File Name</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Path</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Size</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Uploaded</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {media.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-semibold text-gray-900">{item.name}</td>
                  <td className="py-4 px-6 text-gray-600 font-mono text-sm max-w-md overflow-hidden text-ellipsis">
                    {item.path}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{formatFileSize(item.size)}</td>
                  <td className="py-4 px-6 text-gray-600">{item.uploadedAt}</td>
                  <td className="py-4 px-6 flex gap-2">
                    <button
                      onClick={() => handleCopyPath(item.path)}
                      className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Copy path to clipboard"
                    >
                      {copied === item.path ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      title="Delete file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-3">How to Use Media Manager</h3>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>• <strong>Upload to any location:</strong> Change the upload path to upload files anywhere (e.g., /images/, /assets/hero/, /uploads/)</li>
          <li>• <strong>Replace existing files:</strong> Upload a file with the same name and path to replace an existing image on the site</li>
          <li>• <strong>Copy paths:</strong> Click the copy button to copy file paths and use them in product descriptions or elsewhere</li>
          <li>• <strong>Delete files:</strong> Remove files from the media library using the delete button</li>
          <li>• <strong>Supported formats:</strong> JPEG, PNG, GIF, WebP, SVG (Images only in this demo)</li>
        </ul>
      </div>
    </div>
  );
}
