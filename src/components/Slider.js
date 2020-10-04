import React, { useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import TagReport from './TagReport';
import Tag from './Tag';
import Highlighter from 'react-highlight-words';

const Slider = (props) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderRef, slider] = useKeenSlider({
    initial: props.viewReport,
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
            {props.filteredReports.map((report, idx) => (
              <div key={report.id} className='keen-slider__slide number-slide1 flex flex-col'>
                <div className='flex flex-row text-sm justify-between w-1/2 mb-4'>
                  <p>
                    Viewing {idx + 1} of {props.filteredReports.length}
                  </p>
                  <button
                    className='border border-black rounded-lg px-3'
                    onClick={() => props.setViewReport(null)}
                  >
                    Close
                  </button>
                </div>
                <div className='flex flex-row justify-between w-1/2'>
                  <TagReport
                    report={report}
                    reports={props.reports}
                    setReports={props.setReports}
                    filteredReports={props.filteredReports}
                    setFilteredReports={props.setFilteredReports}
                    currentSlide={currentSlide}
                    idx={idx}
                  />
                  <div className='w-3/4'>
                    <h3 className='font-bold'>{report.title}</h3>
                    <Highlighter searchWords={[props.searchText]} textToHighlight={report.text} />
                  </div>
                </div>
              </div>
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
