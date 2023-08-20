import React, { useRef, useEffect } from 'react';
import Quagga from 'quagga';

function QRScanner({ onScan }) {
  const videoRef = useRef(null);

  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: videoRef.current
      },
      decoder: {
        readers: ["ean_reader"]
      }
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected((data) => {
      console.log(data.codeResult.code);
      onScan(data.codeResult.code);
    });

    return () => {
      Quagga.stop();
    }
  }, [onScan]);

  return (
    <div>
      <video ref={videoRef} />
    </div>
  );
}

export default QRScanner;
