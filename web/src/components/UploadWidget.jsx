import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

let cloudinary;

const UploadWidget = ({ children, onUpload }) => {

  const widget = useRef();
  useEffect(() => {
    if ( !cloudinary ) {
      cloudinary = window.cloudinary;
    }

    function onIdle() {
      if ( !widget.current ) {
        widget.current = createWidget();
      }
    }

    'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);

    return () => {
      widget.current?.destroy();
      widget.current = undefined;
    }
  }, []);

  function createWidget() {
    
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      console.warn(`Kindly ensure you have the cloudName and UploadPreset 
      setup in your .env file at the root of your project.`)
    }
    const options = {
      cloudName, 
      uploadPreset, 
      folder: 'trainingThesisVideo'
    }

    return cloudinary?.createUploadWidget(options,
      function (error, result) {
        if ((error || result.event === 'success') && typeof onUpload === 'function' ) {
          console.log(result)
          onUpload(error, result, widget);
        }
      }
    );
  }

  function open() {
    if ( !widget.current ) {
      widget.current = createWidget();
    }
    widget.current && widget.current.open();
  }

  return (
    <>
      {children({ cloudinary, widget, open })}
    </>
  )
}

UploadWidget.propTypes = {
    children: PropTypes.func ,
    onUpload: PropTypes.func ,
  };
  
export default UploadWidget;