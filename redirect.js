// redirect.js
window.onload = function () {
  let urlParams = new URLSearchParams(window.location.search);
  let redirectUrl = urlParams.get("redirectUrl");
  fetch(`https://archive.org/wayback/available?url=${redirectUrl}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (
        data.archived_snapshots &&
        data.archived_snapshots.closest !== undefined &&
        data.archived_snapshots.closest.available
      ) {
        window.location.href = data.archived_snapshots.closest.url;
      } else {
        document.body.innerHTML = `
                <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;">
                <!-- sad reddit svg -->
                <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 800 800"
                    style="enable-background: new 0 0 800 800; width: 200px; height: 200px;"
                    xml:space="preserve"
                >
                    <style type="text/css">
                        .st0 {
                          fill: #fc471e;
                        }
                        .st1 {
                          fill-rule: evenodd;
                          clip-rule: evenodd;
                          fill: #ffffff;
                        }
                      </style>
                      <path
                        class="st0"
                        d="M400,50C207,50,50,207,50,400c0,193,157,350,350,350c193,0,350-157,350-350C750,207,593,50,400,50z"
                      />
                      <path
                        class="st1"
                        d="M500.5,222.7c-0.3,2-0.5,4.1-0.5,6.2c0,21.2,16.8,38.4,37.5,38.4s37.5-17.2,37.5-38.4
                                c0-21.2-16.8-38.4-37.5-38.4c-9.2,0-17.7,3.4-24.2,9.1L415.9,175l-35.2,144.1c-46.8,3.2-88.9,17.7-120.7,39.6
                                c-9-9.1-21.4-14.6-35-14.6c-27.6,0-50,22.9-50,51.2c0,19.7,10.8,36.8,26.7,45.3c-1.1,6.1-1.7,12.3-1.7,18.7
                                C200,537,289.5,600,400,600s200-63,200-140.8c0-6.3-0.6-12.6-1.7-18.7c15.9-8.6,26.7-25.6,26.7-45.3c0-28.3-22.4-51.2-50-51.2
                                c-13.6,0-26,5.6-35,14.6c-34.6-23.9-81.5-39-133.4-40.2L434.1,206L500.5,222.7z M312.5,472c20.7,0,37.5-17.2,37.5-38.4
                                c0-21.2-16.8-38.4-37.5-38.4S275,412.4,275,433.6C275,454.9,291.8,472,312.5,472z M487.5,472c20.7,0,37.5-17.2,37.5-38.4
                                c0-21.2-16.8-38.4-37.5-38.4S450,412.4,450,433.6C450,454.9,466.8,472,487.5,472z M480.6,559.6c5.7,3.9,13.5,2.3,17.3-3.5
                                c3.8-5.9,2.3-13.8-3.5-17.7c-27.2-18.6-60.8-27.8-94.4-27.8c-33.6,0-67.2,9.3-94.4,27.8c-5.7,3.9-7.3,11.9-3.5,17.7
                                c3.8,5.9,11.6,7.5,17.3,3.5c23-15.7,51.8-23.5,80.6-23.5c17.1,0,34.1,2.8,50,8.3C460.9,548.1,471.2,553.2,480.6,559.6z"
                      />
                    </svg>
                    <p style="color: #fff; font-size: 20px;" >No archives available</p>
                    <button id="copyClipboard" style="color: ; font-size: 16px; margin: 12px">Copy original URL to clipboard</button>
                    <button id="openIncognito" style="color: ; font-size: 16px; margin: 12px">Open original link in incognito window</button>
            </div>
            `;
        document
          .getElementById("openIncognito")
          .addEventListener("click", function () {
            chrome.windows.create({ url: redirectUrl, incognito: true });
          });
        document
          .getElementById("copyClipboard")
          .addEventListener("click", function () {
            navigator.clipboard.writeText(redirectUrl).then(
              function () {
                /* clipboard successfully set */
                // change the text of the button with id="copyClipboard" to "Copied to clipboard!"
                document.getElementById("copyClipboard").innerText =
                  "Copied to clipboard!";
              },
              function () {
                /* clipboard write failed */
                // change the text of the button to "Failed to copy to clipboard"
                document.getElementById("copyClipboard").innerText =
                  "Failed to copy to clipboard";
              }
            );
          });
      }
    })
    .catch((e) => {
      console.log(
        "There has been a problem with your fetch operation: " + e.message
      );
      window.location.href = redirectUrl; // Redirect to the original URL in case of fetch error
    });
};
