const urlInputEl = document.querySelector("#url-input");
const qrCodeResultEl = document.querySelector(".qr-code-img");
const generateBtn = document.querySelector("#generate-btn");
const downloadBtn = document.querySelector("#download-btn");
const shareBtn = document.querySelector("#share-btn");

function generateQRCode() {
  const urlInputValue = urlInputEl.value.trim();

  if (qrCodeResultEl.innerHTML.trim() == "") {
    new QRCode(qrCodeResultEl, {
      text: urlInputValue,
      width: 140,
      height: 140,
    });
  }

  urlInputEl.value = "";
}

function downloadQRCode(event) {

  let img = document.querySelector(".qr-code-img img");
  let canvas = document.querySelector("canvas");

  if (img) {

    let imgSrc = img.getAttribute("src");
    downloadBtn.setAttribute("href", imgSrc);
    downloadBtn.setAttribute("download", "qr-code.png");

  } else if (canvas) {

    let dataURL = canvas.toDataURL("image/png");
    downloadBtn.setAttribute("href", dataURL);
    downloadBtn.setAttribute("download", "qr-code.png");

  } else {
    event.preventDefault();
    alert("Please generate a QR code before downloading.");
  }

}

async function shareQRCode() {
  const img = document.querySelector(".qr-code-img img");
  const canvas = document.querySelector("canvas");

  if (navigator.share) {
    if (img) {
      const response = await fetch(img.src);
      const blob = await response.blob();
      const file = new File([blob], "qr-code.png", { type: "image/png" });

      try {
        await navigator.share({
          title: "QR Code",
          text: "Here's a QR code I generated!",
          files: [file],
        });
      } catch (err) {
        console.error("Sharing failed:", err);
      }

    } else if (canvas) {
      canvas.toBlob(async (blob) => {
        const file = new File([blob], "qr-code.png", { type: "image/png" });

        try {
          await navigator.share({
            title: "QR Code",
            text: "Here's a QR code I generated!",
            files: [file],
          });
        } catch (err) {
          console.error("Sharing failed:", err);
        }
      });
    } else {
      alert("Please generate a QR code before sharing.");
    }
  } else {
    alert("Sharing is not supported on this browser.");
  }
}

shareBtn.addEventListener("click", shareQRCode)
downloadBtn.addEventListener("click", downloadQRCode);
generateBtn.addEventListener("click", generateQRCode)