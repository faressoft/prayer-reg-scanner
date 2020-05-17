const scanOptions = {
  prompt: '',
  preferFrontCamera: false,
  showFlipCameraButton: false,
  showTorchButton: false,
  torchOn: true,
  resultDisplayDuration: 0,
  formats: 'QR_CODE',
  orientation: 'portrait',
  disableAnimations: true,
  disableSuccessBeep: true,
};

function scan() {
  return new Promise((resolve, reject) => {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        if (result.cancelled) {
          return reject(new Error('Cancelled'));
        }
        resolve(result);
      },
      function (error) {
        reject(error);
      },
      scanOptions
    );
  });
}
