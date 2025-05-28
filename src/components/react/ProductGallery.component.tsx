import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, Pagination, Thumbs } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'

// Import custom styles
import '@src/styles/product-gallery.css'

interface ProviderMetadataDTO {
  public_id: string
  resource_type: string
}

interface ImageFormatDTO {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
  provider_metadata: ProviderMetadataDTO
}

interface RichTextImageFormatsDTO {
  small?: ImageFormatDTO
  medium?: ImageFormatDTO
  thumbnail?: ImageFormatDTO
  [key: string]: ImageFormatDTO | undefined
}

interface ImagenNestedDTO {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: RichTextImageFormatsDTO | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: ProviderMetadataDTO
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface ProductGalleryProps {
  images: ImagenNestedDTO[]
  productName: string
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="w-full">
        <div className="product-image-container h-[250px] sm:h-[350px] lg:h-[400px]">
          <img
            src="/producto/placehold.png"
            alt={productName}
            className="max-w-full max-h-full object-contain drop-shadow-sm"
            width={600}
            height={400}
          />
        </div>
      </div>
    )
  }

  const isVideo = (mime: string) => mime.startsWith('video/')

  return (
    <div className="w-full">
      {/* Main Gallery */}
      <div className="mb-4">
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          spaceBetween={10}
          navigation
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="main-gallery"
          centeredSlides={true}
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.id}>
              <div className="product-image-container h-[250px] sm:h-[350px] lg:h-[400px] w-full">
                {isVideo(image.mime)
                  ? (
                  <video
                    src={image.url}
                    controls
                    className="max-w-full max-h-full object-contain drop-shadow-sm rounded-lg"
                    poster={image.previewUrl || undefined}
                  >
                    Tu navegador no soporta el elemento de video.
                  </video>
                    )
                  : (
                  <img
                    src={image.url}
                    alt={image.alternativeText || `${productName} - Imagen ${index + 1}`}
                    className="max-w-full max-h-full object-contain drop-shadow-sm"
                    width={600}
                    height={400}
                  />
                    )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 px-2 sm:px-4">
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            centeredSlides={false}
            breakpoints={{
              640: {
                slidesPerView: 5,
                spaceBetween: 10
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 12
              }
            }}
            className="thumbs-gallery"
          >
            {images.map((image, index) => (
              <SwiperSlide key={`thumb-${image.id}`}>
                <div
                  className={`cursor-pointer transition-all duration-300 p-1 ${
                    activeIndex === index
                      ? 'ring-3 ring-blue-500 ring-offset-2 shadow-lg transform scale-105 rounded-lg'
                      : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-1 hover:shadow-md hover:transform hover:scale-102 rounded-lg'
                  }`}
                  onClick={() => {
                    if (thumbsSwiper) {
                      thumbsSwiper.slideTo(index)
                    }
                  }}
                >
                  <div className={`p-2 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 transition-colors duration-300 rounded-lg ${
                    activeIndex === index ? 'bg-blue-50' : 'bg-gray-50'
                  }`}>
                    {isVideo(image.mime)
                      ? (
                      <div className="relative video-thumbnail-overlay w-full h-full">
                        <img
                          src={image.previewUrl || image.url}
                          alt={`Miniatura ${index + 1}`}
                          className="w-full h-full object-contain rounded"
                          width={64}
                          height={64}
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white drop-shadow-lg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                        )
                      : (
                      <img
                        src={image.url}
                        alt={`Miniatura ${index + 1}`}
                        className="w-full h-full object-contain rounded"
                        width={64}
                        height={64}
                      />
                        )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  )
}
