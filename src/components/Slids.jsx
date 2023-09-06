import React from 'react'
import styles from './CSS/Slids.module.css'


export default function Slids({ images, autoSlide = `true`, withTitle = 'true', withText = 'true', withBtns = 'true', withDots = 'true' }) {
    const [curentIndex, setCurentIndex] = React.useState(0);
    const autoSlideIntervalRef = React.useRef(null)
    const goPrev = () => {
        if (images.length > 1) {
            // console.log('from slide', images.length)
            autoSlide && clearInterval(autoSlideIntervalRef.current);
            setCurentIndex((pre) => { return (pre === 0 ? images.length - 1 : pre - 1) })
        }
    }
    const goNext = () => {
        if (images.length > 1) {
            // console.log('from slide', images)
            autoSlide && clearInterval(autoSlideIntervalRef.current);
            setCurentIndex((pre) => { return (pre === images.length - 1 ? 0 : pre + 1) })
        }
    }
    const goToSlide = (index) => {
        if (images.length > 1) {
            // console.log('from slide', images.length)
            autoSlide && clearInterval(autoSlideIntervalRef.current);
            index !== curentIndex && setCurentIndex(index);
        }
    }
    React.useEffect(() => {
        if (autoSlide) {
            autoSlideIntervalRef.current = setInterval(() => {
                goNext();
            }, 3000);
        }
        return () => {
            autoSlide && clearInterval(autoSlideIntervalRef.current);
        };
    })

    return (
        <div className={styles.outerCont} >
            {(withBtns && images.length > 1) &&
                <div className={styles.btnCont + ' ' + styles.prev} >
                    <button className={styles.btn + ' ' + styles.prev} onClick={goPrev}>&#10094;</button>
                </div>
            }
            <div className={styles.imgsWarper}   >
                {
                    images.map((slide, index) => (
                        <div className={index === curentIndex ? `${styles.slideDiv + ' ' + styles.active}` : `${styles.slideDiv}`} key={index}>
                            <div className={styles.imgDiv} style={
                                slide.imgUrl !== null ? { backgroundImage: `url(.${slide.imgUrl})` } : null
                            }>
                                <span className={styles.innerTextSpan}>
                                    {slide.innerText !== null && slide.innerText}
                                </span>
                            </div>
                            {withTitle && <div className={styles.titleDiv}><h3>{slide.title}</h3></div>}
                            {withText && <div className={styles.textDiv}><span>{slide.text}</span></div>}
                        </div>
                    ))
                }
            </div>
            {
                withDots &&
                <div className={styles.dotsDiv}>
                    {
                        images.map((slide, index) => (
                            <span className={index === curentIndex ? `${styles.dot}  ${styles.activeDot}` : `${styles.dot}`} key={`dot_${index}`} onClick={() => goToSlide(index)}></span>
                        ))
                    }
                </div>
            }

            {
                (withBtns && images.length > 1) &&
                <div className={styles.btnCont + ' ' + styles.next}>
                    <button className={styles.btn + ' ' + styles.next} onClick={goNext}>&#10095;</button>
                </div>
            }

        </div >
    )
}
