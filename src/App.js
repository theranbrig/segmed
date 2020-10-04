import React, { useEffect, useState } from 'react';

import Slider from './components/Slider';
import StandardListItem from './components/StandardListItem';
import ClickListItem from './components/ClickListItem';
import Input from './components/Input';

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
    if (!text.length) {
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
    <div className='p-4 lg:py-12 lg:px-32'>
      <Input
        searchText={searchText}
        searchReports={searchReports}
        filteredReports={filteredReports}
      />
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
