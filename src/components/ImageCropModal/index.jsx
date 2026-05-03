import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';

const ImageCropModal = ({ imageSrc, onCropComplete, onCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        try {
            setIsProcessing(true);
            const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
            
            // convert blob into generic File object
            const croppedFile = new File([croppedBlob], "cropped_profile.jpg", {
                type: "image/jpeg",
            });
            
            onCropComplete(croppedFile, URL.createObjectURL(croppedBlob));
        } catch (e) {
            console.error("Crop error", e);
        } finally {
            setIsProcessing(false);
        }
    };

    const modalContent = (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
            <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] shadow-2xl overflow-hidden flex flex-col">
                
                <div className="p-4 sm:p-5 border-b border-gray-100 flex justify-between items-center shrink-0">
                    <h3 className="font-bold text-gray-800 text-lg">Adjust Profile Picture</h3>
                    <button onClick={onCancel} className="text-gray-400 hover:text-red-500 font-bold transition text-xl cursor-pointer">
                        &times;
                    </button>
                </div>
                
                <div className="relative w-full h-[60vh] max-h-[400px] min-h-[250px] bg-gray-900 shrink-0">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={onCropChange}
                        onCropComplete={handleCropComplete}
                        onZoomChange={onZoomChange}
                    />
                </div>
                
                <div className="p-4 sm:p-6 bg-gray-50 flex flex-col gap-4 shrink-0 overflow-y-auto">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Zoom</span>
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(e.target.value)}
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-2">
                        <button
                            onClick={onCancel}
                            disabled={isProcessing}
                            className="px-5 py-2 rounded-xl text-gray-600 font-medium hover:bg-gray-200 transition cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isProcessing}
                            className="px-5 py-2 rounded-xl text-white font-medium bg-linear-to-r from-purple-600 to-pink-500 shadow-md hover:opacity-90 active:scale-95 transition cursor-pointer"
                        >
                            {isProcessing ? "Cropping..." : "Save Picture"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default ImageCropModal;
