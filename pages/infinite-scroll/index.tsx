import axios from "axios";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
export const InfiniteScrollPage = () => {
  const [images, setImages] = useState([]);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [firstLoadCompleted, setFirstLoadCompleted] = useState(false);
  const [photosWereDonwloaded, setPhotosWereDownloaded] = useState(false);
  const [downloadedImagesQuantity, setDownloadedImagesQuantity] = useState(0);

  const tableWrapperrRef = useRef();
  const tableRef = useRef();

  const checkNeccecityDownloadPhotos = useCallback(async () => {
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 2000 &&
      photosWereDonwloaded
    ) {
      console.log("downloadedImagesQuantity", downloadedImagesQuantity);
      console.log("load more");
      setDownloadedImagesQuantity((pV) => {
        if (pV === limit) {
          return 0;
        } else return pV;
      });
      setPhotosWereDownloaded((pV) => false);
      setSkip((previousValue) => {
        return previousValue + 20;
      });
    }
  }, [photosWereDonwloaded, downloadedImagesQuantity, limit]);

  const onImageLoad = useCallback(() => {
    console.log("image downloaded");
    console.log(
      "downloadedImagesQuantity in onImageLoad",
      downloadedImagesQuantity
    );
    setDownloadedImagesQuantity((prevVal) => {
      if (prevVal === limit) {
        return 0;
      }
      return prevVal + 1;
    });
  }, [limit, downloadedImagesQuantity]);

  useEffect(() => {
    window.addEventListener("scroll", checkNeccecityDownloadPhotos);

    return () => {
      window.removeEventListener("scroll", checkNeccecityDownloadPhotos);
    };
  }, [checkNeccecityDownloadPhotos]);

  useEffect(() => {
    (async () => {
      let newImages = await loadDate(skip, limit);
      setImages((previousValue) => [...previousValue, ...newImages]);
    })();
  }, [skip, limit]);

  useEffect(() => {
    if (downloadedImagesQuantity === limit) {
      setPhotosWereDownloaded((pv) => true);
    }
  }, [downloadedImagesQuantity, limit]);

  return (
    <div ref={tableWrapperrRef} className="overflow-x-auto relative">
      <table
        ref={tableRef}
        className="table-auto w-full   text-sm text-gray-500 dark:text-gray-400"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Id
            </th>
            <th scope="col" className="py-3 px-6">
              Description
            </th>
            <th scope="col" className="py-3 px-6">
              Image
            </th>
          </tr>
        </thead>
        <tbody>
          {images.map((image, index) => {
            return (
              <>
                <tr
                  key={image.id}
                  className="bg-white border-b-4 dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{image.id}</td>
                  <td className="py-4 px-6 ">{image.title}</td>
                  <td className="py-4 px-6">
                    <Image
                      onLoad={onImageLoad}
                      src={image.url + ".png"}
                      width={300}
                      height={200}
                      alt={image.title}
                    ></Image>
                  </td>
                </tr>
                {index === images.length - 1 && !photosWereDonwloaded && (
                  <div className="flex flex-row justify-center mx-auto absolute left-1/2 -translate-x-4">
                    <Image src="/spinner.svg" width={100} height={100}></Image>
                  </div>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const loadDate = async (skip, limit) => {
  try {
    let res = await axios.get(`/api/getPhotoData?skip=${skip}&limit=${limit}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};

export default InfiniteScrollPage;
