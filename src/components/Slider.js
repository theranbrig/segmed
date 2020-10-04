import React, { useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import FullScreenItem from './FullScreenItem';

const Slider = ({
  viewReport,
  reports,
  setReports,
  filteredReports,
  setFilteredReports,
  setViewReport,
  searchText,
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderRef, slider] = useKeenSlider({
    initial: viewReport,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (slider) {
        if (e.code === 'ArrowLeft') {
          slider.prev();
        }
        if (e.code === 'ArrowRight') {
          slider.next();
        }
      }
    });
  }, [slider]);

  return (
    <>
      <div className='fixed top-0 left-0 w-full'>
        <div className='navigation-wrapper w-full'>
          <div ref={sliderRef} className='keen-slider min-h-screen '>
            {filteredReports.map((report, idx) => (
              <FullScreenItem
                report={report}
                reports={reports}
                setReports={setReports}
                filteredReports={filteredReports}
                setFilteredReports={setFilteredReports}
                currentSlide={currentSlide}
                setViewReport={setViewReport}
                searchText={searchText}
                idx={idx}
              />
            ))}
          </div>
          {slider && (
            <>
              <ArrowLeft
                onClick={(e) => e.stopPropagation() || slider.prev()}
                disabled={currentSlide === 0}
              />

              <ArrowRight
                onClick={(e) => e.stopPropagation() || slider.next()}
                disabled={currentSlide === slider.details().size - 1}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

function ArrowLeft(props) {
  const disabled = props.disabled ? ' arrow--disabled' : '';
  return (
    <>
      <svg
        onClick={props.onClick}
        className={'arrow arrow--left' + disabled}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
      >
        <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
      </svg>
      <p className='arrow--label arrow--left'>Prev</p>
    </>
  );
}

function ArrowRight(props) {
  const disabled = props.disabled ? ' arrow--disabled' : '';
  return (
    <>
      <svg
        onClick={props.onClick}
        className={'arrow arrow--right' + disabled}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
      >
        <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
      </svg>
      <p className='arrow--label arrow--right'>Next</p>
    </>
  );
}

export default Slider;
