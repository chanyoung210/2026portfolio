import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import styles from './Portfolio.module.css'

function ChevronIcon({ direction }) {
  const points = direction === 'left' ? '15 6 9 12 15 18' : '9 6 15 12 9 18'
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polyline
        points={points}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ClientCard({ card }) {
  return (
    <div className={styles.solutionCard}>
      <div className={styles.solutionCardImage}>
        <img
          src={card.image}
          alt={card.client}
          className={styles.solutionCardImg}
        />
      </div>
      <div className={styles.solutionCardMeta}>
        <h4 className={styles.solutionCardClient}>{card.client}</h4>
        <p className={styles.solutionCardDesc}>{card.desc}</p>
      </div>
    </div>
  )
}

function CtaSlide() {
  return (
    <div className={styles.ctaSlide}>
      <div className={styles.ctaSlideStack}>
        <span
          className={`${styles.ctaSlideWorks} ${styles.ctaSlideWorksDefault}`}
        >
          Works
        </span>
        <span
          className={`${styles.ctaSlideWorks} ${styles.ctaSlideWorksHover}`}
        >
          Works
        </span>
      </div>
      <span className={styles.ctaSlideMore}>더 보러가기 +</span>
    </div>
  )
}

export default function SolutionCarousel({ carousel }) {
  const swiperRef = useRef(null)

  return (
    <div className={styles.carouselSection}>
      <div className={styles.carouselWrap}>
        <div className={styles.carouselBar}>
          <span className={styles.carouselTitle}>
            Works
            <span className={styles.carouselDot}>.</span>
          </span>
          <div className={styles.carouselNav}>
            <button
              type="button"
              className={styles.carouselArrow}
              aria-label="이전 슬라이드"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              className={styles.carouselArrow}
              aria-label="다음 슬라이드"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        </div>

        <Swiper
          onSwiper={(instance) => {
            swiperRef.current = instance
          }}
          slidesPerView={1.15}
          spaceBetween={16}
          breakpoints={{
            768: { slidesPerView: 2.2, spaceBetween: 24 },
            1024: { slidesPerView: 3.2, spaceBetween: 32 },
          }}
          className={styles.carousel}
        >
          {carousel.cards.map((card) => (
            <SwiperSlide key={card.client}>
              <ClientCard card={card} />
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <CtaSlide />
          </SwiperSlide>
        </Swiper>
      </div>

      {carousel.title && (
        <div className={styles.infoText}>
          <span className={styles.infoLabel}>{carousel.label}</span>
          <h3 className={styles.infoTitle}>{carousel.title}</h3>
          <p className={styles.infoBody}>{carousel.body}</p>
        </div>
      )}
    </div>
  )
}
