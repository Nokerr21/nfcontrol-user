import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { logQrScanRes } from "./LogQrScanRes";
import { sleep } from "./Sleep";
import { getDateAndTime } from "../../Date/GetDateAndTime";

export function renderQrScanner(){
    const scannerConfig = {
        fps: 15,
        qrbox: 250,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        rememberLastUsedCamera: false,
        showTorchButtonIfSupported: true,
        aspectRatio: 1.0
    }
    const html5QrcodeScanner = new Html5QrcodeScanner("readerQR", scannerConfig);
  
    html5QrcodeScanner.render(onScanSuccess);

    async function onScanSuccess(decodedText, decodedResult) {
        var dateTime = getDateAndTime();
        console.log(`Scan result: ${decodedText}`, decodedResult);
        logQrScanRes("Message: '" + decodedText + "' decoded!" + "\n" + "TimeStamp: " + dateTime);
        html5QrcodeScanner.pause();
        await sleep(700);
        html5QrcodeScanner.resume();
    }
}