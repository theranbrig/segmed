import React from 'react';
import Tag from './Tag';
import Highlighter from 'react-highlight-words';

const ClickListItem = ({ report, idx, searchText, setViewReport }) => {
  return (
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
  );
};

export default ClickListItem;
