const ACCESS_KEY = 'Esr2BW16gKxlhD-t3bI6I3dNSRyA_g7hdBvl8VJoxFI'

const searchPicture = () => {
    const pictureName = document.querySelector(".searchedPictureName").value
    const imagesBox = document.querySelector(".imagesBox")
    const mainContent = document.querySelector(".mainContent")
    const addContent = document.querySelector(".addContent")


    let responseText = ''

    const xhr = new XMLHttpRequest()
    xhr.open(
        'GET',
        `https://api.unsplash.com/search/photos?query=${pictureName}&per_page=12&page=1&client_id=${ACCESS_KEY}`,
        true
    )
    xhr.send()

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) {
            return
        }

        if (xhr.status === 200) {
            while (imagesBox.firstChild) {
                imagesBox.removeChild(imagesBox.firstChild);
            }
            responseText = JSON.parse(xhr.responseText)

            const results = responseText.results

            const resultImages = results.map((result) => result.urls.small)

            resultImages.forEach((img, index) => {
                const resultImg = document.createElement('img')
                resultImg.className = `imgClass img${index}`
                resultImg.src = img
                resultImg.onclick = () => {
                    const singleImgData = document.querySelector(".singleImgData")
                    while (singleImgData.firstChild) {
                        singleImgData.removeChild(singleImgData.firstChild);
                    }
                    mainContent.style.display = 'none'
                    addContent.style.display = 'flex'

                    const link = document.createElement('a')
                    link.href = img
                    link.innerHTML = img
                    singleImgData.append(link)

                    const singleImg = document.createElement('img')
                    singleImg.className = `singleImg`
                    singleImg.src = img
                    singleImgData.append(singleImg)
                }
                imagesBox.append(resultImg)
            })


        } else {
            console.log('err', xhr.responseText)
        }
    }
}

const backToMainContent = () => {
    const mainContent = document.querySelector(".mainContent")
    const addContent = document.querySelector(".addContent")

    mainContent.style.display = 'flex';
    addContent.style.display = 'none';
}

