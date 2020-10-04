import React, { useEffect, useState } from 'react';

import Slider from './components/Slider';
import Highlighter from 'react-highlight-words';
import Tag from './components/Tag';

function App() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([
    {
      id: 1,
      text: 'Burn of third degree of left axilla',
      tags: [
        { id: 1, text: '#goodreport (1)', background: 'bg-green-300' },
        { id: 2, text: '#conditionfound (2)', background: 'bg-red-300' },
      ],
      title: 'Report Title 1',
    },
  ]);
  const [searchText, setSearchText] = useState('');
  const [viewReport, setViewReport] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/files.json')
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setReports(data);
        console.log(data);
      });
  }, []);

  const searchReports = (text) => {
    setSearchText(text);
    if (!text) {
      setFilteredReports([]);
    }
    const filteredReports = reports.filter((report) => {
      const textString = report.text.toLowerCase().split(' ').join('');
      const searchString = text.toLowerCase().split(' ').join('');
      return textString.includes(searchString);
    });
    setFilteredReports(filteredReports);
  };

  return (
    <div className='py-12 px-32'>
      <div className='flex flex-col items-center mb-12'>
        <input
          className='border border-black rounded-full px-4'
          type='text'
          onChange={(e) => searchReports(e.target.value)}
          value={searchText}
        />
        {searchText.length ? (
          <p className='inline'>
            {filteredReports.length} report{filteredReports.length === 1 ? '' : 's'} found for "
            {searchText}"
          </p>
        ) : (
          <p className='inline'>Search Reports</p>
        )}
      </div>
      <ul className='list-none'>
        {filteredReports.length
          ? filteredReports.map((report, idx) => (
              <li
                className='grid grid-cols-report text-left py-3 border-t border-t-blue-300 items-start'
                key={report.id}
              >
                <span>{idx + 1}. </span>
                <span>
                  <button className='text-left font-bold' onClick={() => setViewReport(idx)}>
                    {report.title}
                  </button>
                  {' - '}
                  <Highlighter searchWords={[searchText]} textToHighlight={report.text} />
                </span>
                <ul className='text-right'>
                  {report.tags
                    .sort((a, b) => a.id - b.id)
                    .map((tag) => (
                      <Tag key={tag.id} tag={tag} />
                    ))}
                </ul>
              </li>
            ))
          : reports.map((report, idx) => (
              <li
                className='grid grid-cols-report text-left py-3 border-t border-t-blue-300 items-start'
                key={report.id}
              >
                <span className='mr-4'>{idx + 1}. </span>
                <span>
                  {report.title} - {report.text}
                </span>
                <ul className='text-right'>
                  {report.tags.length ? (
                    report.tags
                      .sort((a, b) => a.id - b.id)
                      .map((tag) => <Tag key={tag.id} tag={tag} />)
                  ) : (
                    <p className='text-center'> - </p>
                  )}
                </ul>
              </li>
            ))}
      </ul>
      {viewReport !== null ? (
        <Slider
          reports={reports}
          filteredReports={filteredReports}
          viewReport={viewReport}
          setViewReport={setViewReport}
          setReports={setReports}
          setFilteredReports={setFilteredReports}
          searchText={searchText}
        />
      ) : null}
    </div>
  );
}

export default App;
