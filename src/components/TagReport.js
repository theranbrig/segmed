import React, { useState } from 'react';

import KeyHandler, { KEYPRESS } from 'react-key-handler';

const TagReport = ({
  reports,
  report,
  setReports,
  filteredReports,
  setFilteredReports,
  currentSlide,
  idx,
}) => {
  const [loading, setLoading] = useState(false);
  const tags = [
    { id: 1, text: '#goodreport (1)', background: 'bg-green-300' },
    { id: 2, text: '#conditionfound (2)', background: 'bg-red-300' },
  ];

  const updateList = (arr, id, tag) => {
    const newList = arr.map((report) => {
      if (id === report.id) {
        if (report.tags.some((existing) => existing.id === tag.id)) {
          console.log(report);
          return {
            ...report,
            tags: [...report.tags.filter((existingTag) => existingTag.id !== tag.id)],
          };
        } else {
          console.log(report);
          return {
            ...report,
            tags: [...report.tags, tag],
          };
        }
      } else {
        return { ...report };
      }
    });
    return newList;
  };

  const toggleTag = async (id, tag) => {
    const newReports = await updateList(reports, id, tag);
    const newFilteredReports = await updateList(filteredReports, id, tag);
    setReports(newReports);
    setFilteredReports(newFilteredReports);
    setLoading(false);
  };

  return (
    <>
      {!loading ? (
        <div className='border-r border-r-grey-400 pr-4'>
          <div className='mb-4'>
            <h4 className='border border-grey-400 py-1 px-3 text-center mb-2'>Active Tags</h4>
            {report.tags.map((tag) => (
              <button
                className={`${tag.background} block rounded-lg py-1 px-2 m-1 text-gray-700 text-sm`}
                disabled={loading}
                key={tag.id}
                onClick={() => toggleTag(report.id, tag)}
              >
                <KeyHandler
                  keyEventName={KEYPRESS}
                  keyValue={`${tag.id}`}
                  onKeyHandle={() => {
                    if (currentSlide === idx) {
                      toggleTag(report.id, tag);
                    }
                  }}
                />
                {tag.text}
              </button>
            ))}
          </div>
          <div className='mb-4'>
            <h4 className='border border-grey-400 py-1 px-3 text-center mb-2'>Inactive Tags</h4>
            {tags
              .filter(({ id: id1 }) => !report.tags.some(({ id: id2 }) => id2 === id1))
              .map((tag) => (
                <button
                  className={`${tag.background} block rounded-lg py-1 px-2 m-1 text-gray-700 text-sm`}
                  disabled={loading}
                  key={tag.id}
                  onClick={() => toggleTag(report.id, tag)}
                >
                  <KeyHandler
                    keyEventName={KEYPRESS}
                    keyValue={`${tag.id}`}
                    onKeyHandle={() => {
                      if (currentSlide === idx) {
                        toggleTag(report.id, tag);
                      }
                    }}
                  />
                  {tag.text}
                </button>
              ))}
          </div>
        </div>
      ) : (
        <p>Adding Tag...</p>
      )}
    </>
  );
};

export default TagReport;
