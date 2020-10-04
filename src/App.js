import React, { useEffect, useState } from 'react';

import Slider from './components/Slider';
import Highlighter from 'react-highlight-words';
import Tag from './components/Tag';
import StandardListItem from './components/StandardListItem';
import ClickListItem from './components/ClickListItem';

function App() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [viewReport, setViewReport] = useState(null);

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
              <ClickListItem
                key={report.id}
                report={report}
                idx={idx}
                searchText={searchText}
                setViewReport={setViewReport}
              />
            ))
          : reports.map((report, idx) => (
              <StandardListItem key={report.id} report={report} idx={idx} />
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
