import React from 'react';
import TagReport from './TagReport';
import Highlighter from 'react-highlight-words';

const FullScreenItem = ({
  report,
  idx,
  filteredReports,
  reports,
  setReports,
  setFilteredReports,
  currentSlide,
  searchText,
  setViewReport,
}) => {
  return (
    <div key={report.id} className='keen-slider__slide number-slide1 flex flex-col'>
      <div className=' w-3/4 lg:w-1/2 mx-auto flex flex-row text-sm justify-between mb-4'>
        <p>
          Viewing {idx + 1} of {filteredReports.length}
        </p>
        <button className='border border-black rounded-lg px-3' onClick={() => setViewReport(null)}>
          Close
        </button>
      </div>
      <div className=' w-3/4 lg:w-1/2 mx-auto flex flex-col lg:flex-row justify-between'>
        <TagReport
          report={report}
          reports={reports}
          setReports={setReports}
          filteredReports={filteredReports}
          setFilteredReports={setFilteredReports}
          currentSlide={currentSlide}
          idx={idx}
        />
        <div className=' w-3/4 lg:w-1/2 mx-auto pl-3'>
          <h3 className='font-bold'>{report.title}</h3>
          <Highlighter
            highlightClassName='bg-blue-200'
            searchWords={[searchText]}
            textToHighlight={report.text}
          />
        </div>
      </div>
    </div>
  );
};

export default FullScreenItem;
